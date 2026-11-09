<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
import type { Umkm, SaltPond } from '@/Types';

const props = withDefaults(defineProps<{
  umkms: Umkm[];
  saltPonds?: SaltPond[];
  centerLat?: number;
  centerLng?: number;
  zoomLevel?: number;
  selectedUmkmId?: number | null;
}>(), {
  saltPonds: () => [],
  centerLat: -7.1614, // Pamekasan center
  centerLng: 113.4828,
  zoomLevel: 12,
  selectedUmkmId: null,
});

const emit = defineEmits<{
  (e: 'select-umkm', umkm: Umkm): void;
  (e: 'map-clicked', coords: { lat: number; lng: number }): void;
}>();

const mapContainer = ref<HTMLElement | null>(null);
let mapInstance: any = null;
let umkmLayerGroup: any = null;
let polygonLayerGroup: any = null;

// Initialize Leaflet dynamically (browser-only)
async function initMap() {
  if (typeof window === 'undefined' || !mapContainer.value) return;

  const L = (await import('leaflet')).default;

  // Initialize Map
  mapInstance = L.map(mapContainer.value, {
    zoomControl: true,
    scrollWheelZoom: true,
  }).setView([props.centerLat, props.centerLng], props.zoomLevel);

  // Add OpenStreetMap Tile Layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | MADURA ERP/EIS Pamekasan',
  }).addTo(mapInstance);

  // Initialize Layer Groups
  umkmLayerGroup = L.layerGroup().addTo(mapInstance);
  polygonLayerGroup = L.layerGroup().addTo(mapInstance);

  // Add layer controls
  const overlays = {
    'Titik Lokasi UMKM': umkmLayerGroup,
    'Lahan Tambak Garam (Poligon)': polygonLayerGroup,
  };
  L.control.layers({}, overlays, { position: 'topright' }).addTo(mapInstance);

  // Handle Map Click
  mapInstance.on('click', (e: any) => {
    emit('map-clicked', { lat: e.latlng.lat, lng: e.latlng.lng });
  });

  renderLayers(L);
}

function renderLayers(L: any) {
  if (!mapInstance || !umkmLayerGroup || !polygonLayerGroup) return;

  umkmLayerGroup.clearLayers();
  polygonLayerGroup.clearLayers();

  // 1. Render Salt Ponds (Polygons)
  props.saltPonds.forEach((pond) => {
    // GeoJSON coordinates are [lng, lat], Leaflet polygon expects [lat, lng]
    const latLngs = pond.coordinates.map((ring) => 
      ring.map(([lng, lat]) => [lat, lng])
    );

    const polygon = L.polygon(latLngs, {
      color: '#0284c7', // Ocean cyan
      weight: 2,
      opacity: 0.9,
      fillColor: '#38bdf8',
      fillOpacity: 0.35,
    });

    const popupContent = `
      <div class="p-2 text-xs">
        <div class="inline-block px-1.5 py-0.5 mb-1 text-[10px] font-bold rounded bg-sky-100 text-sky-800 border border-sky-300">
          TAMBAK GARAM DEMO
        </div>
        <h4 class="font-bold text-slate-900 text-sm">${pond.umkm_name}</h4>
        <p class="text-slate-600 mt-1"><strong>Kode:</strong> ${pond.code}</p>
        <p class="text-slate-600"><strong>Luas Lahan:</strong> ${(pond.area_sqm / 10000).toFixed(2)} Ha (${pond.area_sqm.toLocaleString()} m²)</p>
        <p class="text-slate-600"><strong>Kecamatan:</strong> ${pond.district_name}</p>
        <p class="text-slate-600"><strong>Desa:</strong> ${pond.village_name}</p>
        <p class="text-slate-600"><strong>Musim:</strong> ${pond.production_season}</p>
      </div>
    `;

    polygon.bindPopup(popupContent);
    polygonLayerGroup.addLayer(polygon);
  });

  // 2. Render UMKM Markers (Points)
  props.umkms.forEach((umkm) => {
    if (!umkm.latitude || !umkm.longitude) return;

    const isSalt = umkm.sector === 'garam';
    const markerColor = isSalt ? '#0284c7' : '#ea580c'; // Cyan for salt, Orange for seafood
    const categoryBadgeClass = isSalt ? 'bg-sky-100 text-sky-800' : 'bg-orange-100 text-orange-800';

    // SVG Marker pin
    const customIcon = L.divIcon({
      className: 'custom-leaflet-marker',
      html: `
        <div style="background-color: ${markerColor};" class="w-7 h-7 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold transition-transform hover:scale-110">
          ${isSalt ? '🧂' : '🐟'}
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -14],
    });

    const marker = L.marker([umkm.latitude, umkm.longitude], { icon: customIcon });

    const popupHtml = `
      <div class="p-2.5 max-w-xs text-xs font-sans">
        <div class="flex items-center gap-1.5 mb-1.5">
          <span class="px-1.5 py-0.5 rounded text-[10px] font-bold ${categoryBadgeClass}">
            ${umkm.category_label}
          </span>
          <span class="px-1 py-0.5 rounded text-[9px] font-semibold bg-amber-100 text-amber-800">
            DEMO DATA
          </span>
        </div>
        <h4 class="font-bold text-slate-900 text-sm leading-snug">${umkm.name}</h4>
        <p class="text-slate-500 text-[11px] mb-2">Pemilik: <span class="font-medium text-slate-700">${umkm.owner_name}</span></p>
        
        <div class="space-y-1 text-slate-600 border-t border-slate-100 pt-2">
          <p><strong>Alamat:</strong> ${umkm.address}, ${umkm.village_name}, Kec. ${umkm.district_name}</p>
          <p><strong>Kapasitas:</strong> ${umkm.production_capacity}</p>
          <p><strong>Tenaga Kerja:</strong> ${umkm.employee_count} orang</p>
          <p><strong>Kontak:</strong> ${umkm.phone}</p>
        </div>

        <div class="mt-3 pt-2 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400">
          <span>Lat: ${umkm.latitude.toFixed(4)}, Lng: ${umkm.longitude.toFixed(4)}</span>
        </div>
      </div>
    `;

    marker.bindPopup(popupHtml);

    marker.on('click', () => {
      emit('select-umkm', umkm);
    });

    umkmLayerGroup.addLayer(marker);
  });
}

onMounted(() => {
  initMap();
});

watch(() => [props.umkms, props.saltPonds], async () => {
  if (typeof window !== 'undefined') {
    const L = (await import('leaflet')).default;
    renderLayers(L);
  }
}, { deep: true });

onBeforeUnmount(() => {
  if (mapInstance) {
    mapInstance.remove();
    mapInstance = null;
  }
});
</script>

<template>
  <div class="relative w-full h-full min-h-[500px] rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
    <div ref="mapContainer" class="w-full h-full min-h-[500px] z-0"></div>

    <!-- Floating Map Legend -->
    <div class="absolute bottom-4 left-4 z-[400] bg-white/95 backdrop-blur-sm p-3 rounded-lg border border-slate-200 shadow-md text-xs space-y-2 pointer-events-auto">
      <div class="font-bold text-slate-800 text-[11px] uppercase tracking-wider">Legenda WebGIS</div>
      <div class="flex items-center gap-2">
        <div class="w-4 h-4 rounded-full bg-sky-600 flex items-center justify-center text-[9px] text-white">🧂</div>
        <span class="text-slate-700">Sentra UMKM Garam</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-4 h-4 rounded-full bg-orange-600 flex items-center justify-center text-[9px] text-white">🐟</div>
        <span class="text-slate-700">UMKM Olahan Laut (Rengginang/Ikan)</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-4 h-4 rounded border-2 border-sky-600 bg-sky-300/40"></div>
        <span class="text-slate-700">Poligon Tambak Garam</span>
      </div>
    </div>
  </div>
</template>

