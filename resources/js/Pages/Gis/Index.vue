<script setup lang="ts">
import { ref, computed } from 'vue';
import { Head } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import LeafletMap from '@/Components/LeafletMap.vue';
import type { Umkm, SaltPond, District } from '@/Types';
import { Search, Filter, MapPin, Store, Waves, Info } from 'lucide-vue-next';

const props = defineProps<{
  umkms: Umkm[];
  saltPonds: SaltPond[];
  districts: District[];
}>();

const searchQuery = ref('');
const selectedDistrict = ref<string>('all');
const selectedSector = ref<string>('all');
const selectedCategory = ref<string>('all');
const activeUmkm = ref<Umkm | null>(null);

const filteredUmkms = computed(() => {
  return props.umkms.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.owner_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.village_name.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesDistrict = 
      selectedDistrict.value === 'all' || item.district_name === selectedDistrict.value;

    const matchesSector = 
      selectedSector.value === 'all' || item.sector === selectedSector.value;

    const matchesCategory = 
      selectedCategory.value === 'all' || item.category === selectedCategory.value;

    return matchesSearch && matchesDistrict && matchesSector && matchesCategory;
  });
});

const filteredSaltPonds = computed(() => {
  return props.saltPonds.filter((pond) => {
    return selectedDistrict.value === 'all' || pond.district_name === selectedDistrict.value;
  });
});

function handleSelectUmkm(umkm: Umkm) {
  activeUmkm.value = umkm;
}
</script>

<template>
  <AppLayout title="WebGIS Persebaran UMKM Garam & Olahan Laut Pamekasan">
    <Head title="WebGIS Persebaran UMKM Pamekasan" />

    <div class="space-y-4">
      <!-- Header Info Banner -->
      <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 class="text-lg font-bold text-slate-800 flex items-center gap-2">
            <MapPin class="w-5 h-5 text-emerald-600" />
            <span>Peta Spasial WebGIS Kabupaten Pamekasan</span>
          </h2>
          <p class="text-xs text-slate-500 mt-1">
            Visualisasi titik lokasi UMKM (*Point*) dan poligon lahan tambak garam (*Polygon/MultiPolygon*) berbasis Leaflet & PostGIS.
          </p>
        </div>

        <div class="flex items-center gap-2">
          <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <Store class="w-4 h-4 text-emerald-600" />
            <span>{{ filteredUmkms.length }} UMKM Terpetakan</span>
          </span>
          <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-50 border border-sky-200 text-sky-800 text-xs font-semibold">
            <Waves class="w-4 h-4 text-sky-600" />
            <span>{{ filteredSaltPonds.length }} Poligon Tambak</span>
          </span>
        </div>
      </div>

      <!-- Filters & Controls Bar -->
      <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <!-- Search Input -->
        <div class="relative">
          <Search class="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari nama UMKM, pemilik, desa..."
            class="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
          />
        </div>

        <!-- District Filter -->
        <div>
          <select
            v-model="selectedDistrict"
            class="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
          >
            <option value="all">Semua Kecamatan (Galis, Pademawu, Tlanakan)</option>
            <option v-for="d in districts" :key="d.id" :value="d.name">
              Kecamatan {{ d.name }}
            </option>
          </select>
        </div>

        <!-- Sector Filter -->
        <div>
          <select
            v-model="selectedSector"
            class="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
          >
            <option value="all">Semua Sektor Usaha</option>
            <option value="garam">Sektor Garam Rakyat</option>
            <option value="olahan_laut">Sektor Olahan Hasil Laut</option>
          </select>
        </div>

        <!-- Category Filter -->
        <div>
          <select
            v-model="selectedCategory"
            class="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
          >
            <option value="all">Semua Kategori (8 Usaha)</option>
            <option value="petambak_garam">Petambak Garam</option>
            <option value="pengolahan_garam">Pengolahan Garam</option>
            <option value="garam_konsumsi">Garam Konsumsi</option>
            <option value="rengginang_ikan">Rengginang Ikan</option>
            <option value="kerupuk_ikan">Kerupuk Ikan</option>
            <option value="olahan_ikan">Olahan Ikan</option>
            <option value="olahan_udang">Olahan Udang</option>
            <option value="terasi_dan_hasil_laut">Terasi & Hasil Laut</option>
          </select>
        </div>
      </div>

      <!-- Map & Detail Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <!-- Main Map (3 cols on lg) -->
        <div class="lg:col-span-3 min-h-[550px]">
          <LeafletMap
            :umkms="filteredUmkms"
            :saltPonds="filteredSaltPonds"
            @select-umkm="handleSelectUmkm"
          />
        </div>

        <!-- Sidebar Detail Box (1 col on lg) -->
        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col space-y-4">
          <div class="border-b border-slate-200 pb-2">
            <h3 class="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <Info class="w-4 h-4 text-emerald-600" />
              <span>Detail UMKM Terpilih</span>
            </h3>
            <p class="text-[11px] text-slate-500">Klik marker pada peta untuk melihat profil lengkap.</p>
          </div>

          <div v-if="activeUmkm" class="space-y-3 text-xs">
            <div class="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
              <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                {{ activeUmkm.category_label }}
              </span>
              <h4 class="text-sm font-bold text-slate-900 mt-1">{{ activeUmkm.name }}</h4>
              <p class="text-slate-600">Pemilik: <strong>{{ activeUmkm.owner_name }}</strong></p>
            </div>

            <div class="space-y-1.5 text-slate-600">
              <p><strong>Kode Registrasi:</strong> <code class="bg-slate-100 px-1 py-0.5 rounded">{{ activeUmkm.code }}</code></p>
              <p><strong>Alamat:</strong> {{ activeUmkm.address }}</p>
              <p><strong>Wilayah:</strong> Desa {{ activeUmkm.village_name }}, Kec. {{ activeUmkm.district_name }}</p>
              <p><strong>Telepon / WA:</strong> {{ activeUmkm.phone }}</p>
              <p><strong>Tahun Berdiri:</strong> {{ activeUmkm.established_year }}</p>
              <p><strong>Kapasitas:</strong> {{ activeUmkm.production_capacity }}</p>
              <p><strong>Tenaga Kerja:</strong> {{ activeUmkm.employee_count }} orang</p>
              <p><strong>Status Operasional:</strong> <span class="capitalize text-emerald-700 font-semibold">{{ activeUmkm.status }}</span></p>
            </div>

            <div class="pt-2 border-t border-slate-100">
              <span class="inline-block text-[10px] px-2 py-1 bg-amber-100 text-amber-900 rounded font-semibold">
                Status Spasial: DEMO DATA SQA
              </span>
            </div>
          </div>

          <div v-else class="flex-1 flex flex-col items-center justify-center p-6 text-center text-slate-400">
            <MapPin class="w-10 h-10 mb-2 stroke-1 text-slate-300" />
            <p class="text-xs">Belum ada UMKM yang dipilih.</p>
            <p class="text-[11px] text-slate-400 mt-1">Pilih salah satu titik di peta untuk meninjau atribut operasional.</p>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

