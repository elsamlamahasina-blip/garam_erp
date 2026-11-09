<script setup lang="ts">
import { ref, computed } from 'vue';
import { Head, Link } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import type { Umkm, District } from '@/Types';
import { 
  Store, 
  Search, 
  Plus, 
  MapPin, 
  Eye, 
  Phone, 
  Calendar, 
  Users, 
  ShieldCheck, 
  X,
  CheckCircle2
} from 'lucide-vue-next';

const props = defineProps<{
  umkms: Umkm[];
  districts: District[];
}>();

const searchQuery = ref('');
const selectedDistrict = ref('all');
const selectedSector = ref('all');
const activeDetailUmkm = ref<Umkm | null>(null);

const filteredUmkms = computed(() => {
  return props.umkms.filter((u) => {
    const matchSearch = 
      u.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      u.owner_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      u.code.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchDistrict = selectedDistrict.value === 'all' || u.district_name === selectedDistrict.value;
    const matchSector = selectedSector.value === 'all' || u.sector === selectedSector.value;

    return matchSearch && matchDistrict && matchSector;
  });
});

function openDetail(umkm: Umkm) {
  activeDetailUmkm.value = umkm;
}

function closeDetail() {
  activeDetailUmkm.value = null;
}
</script>

<template>
  <AppLayout title="Direktori & Manajemen UMKM Kabupaten Pamekasan">
    <Head title="Manajemen UMKM" />

    <div class="space-y-4">
      <!-- Top Action Bar -->
      <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-base font-bold text-slate-800 flex items-center gap-2">
            <Store class="w-5 h-5 text-emerald-600" />
            <span>Manajemen UMKM Garam & Olahan Laut Pamekasan</span>
          </h2>
          <p class="text-xs text-slate-500 mt-0.5">
            Mendukung 8 kategori UMKM dengan isolasi data terverifikasi SQA.
          </p>
        </div>

        <div class="flex items-center gap-2">
          <Link
            href="/gis"
            class="px-3 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5"
          >
            <MapPin class="w-4 h-4 text-emerald-600" />
            <span>Lihat di Peta WebGIS</span>
          </Link>
          <button
            class="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-xs font-semibold text-white shadow-sm flex items-center gap-1.5"
          >
            <Plus class="w-4 h-4" />
            <span>Tambah UMKM Baru</span>
          </button>
        </div>
      </div>

      <!-- Filters & Search -->
      <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div class="relative">
          <Search class="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari nama, pemilik, kode registrasi..."
            class="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
          />
        </div>

        <div>
          <select
            v-model="selectedDistrict"
            class="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
          >
            <option value="all">Semua Kecamatan</option>
            <option v-for="d in districts" :key="d.id" :value="d.name">
              Kecamatan {{ d.name }}
            </option>
          </select>
        </div>

        <div>
          <select
            v-model="selectedSector"
            class="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
          >
            <option value="all">Semua Sektor (Garam & Olahan Laut)</option>
            <option value="garam">Sektor Garam</option>
            <option value="olahan_laut">Sektor Olahan Laut</option>
          </select>
        </div>
      </div>

      <!-- Table Directory -->
      <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[10px]">
                <th class="py-3 px-4">Kode & Nama Usaha</th>
                <th class="py-3 px-4">Pemilik</th>
                <th class="py-3 px-4">Kategori</th>
                <th class="py-3 px-4">Kecamatan & Desa</th>
                <th class="py-3 px-4">Kapasitas</th>
                <th class="py-3 px-4">Status</th>
                <th class="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr 
                v-for="u in filteredUmkms" 
                :key="u.id"
                class="hover:bg-slate-50/70 transition-colors"
              >
                <td class="py-3 px-4">
                  <div class="font-bold text-slate-900">{{ u.name }}</div>
                  <div class="text-[10px] text-slate-400 font-mono">{{ u.code }}</div>
                </td>
                <td class="py-3 px-4 text-slate-700 font-medium">
                  {{ u.owner_name }}
                </td>
                <td class="py-3 px-4">
                  <span 
                    :class="u.sector === 'garam' ? 'bg-sky-50 text-sky-700 border-sky-200' : 'bg-orange-50 text-orange-700 border-orange-200'"
                    class="px-2 py-0.5 rounded-full text-[10px] font-semibold border"
                  >
                    {{ u.category_label }}
                  </span>
                </td>
                <td class="py-3 px-4 text-slate-600">
                  <div>Kec. {{ u.district_name }}</div>
                  <div class="text-[10px] text-slate-400">Desa {{ u.village_name }}</div>
                </td>
                <td class="py-3 px-4 text-slate-700 font-semibold">
                  {{ u.production_capacity }}
                </td>
                <td class="py-3 px-4">
                  <span class="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 capitalize">
                    <CheckCircle2 class="w-3 h-3 text-emerald-600" />
                    {{ u.status }}
                  </span>
                </td>
                <td class="py-3 px-4 text-right">
                  <button
                    @click="openDetail(u)"
                    class="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
                    title="Lihat Detail UMKM"
                  >
                    <Eye class="w-4 h-4" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Detail Modal -->
      <div 
        v-if="activeDetailUmkm" 
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4"
      >
        <div class="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full p-6 space-y-4">
          <div class="flex items-start justify-between border-b border-slate-100 pb-3">
            <div>
              <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                {{ activeDetailUmkm.category_label }}
              </span>
              <h3 class="text-base font-bold text-slate-900 mt-1">{{ activeDetailUmkm.name }}</h3>
              <p class="text-xs text-slate-500">Kode Registrasi: {{ activeDetailUmkm.code }}</p>
            </div>
            <button 
              @click="closeDetail"
              class="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <X class="w-5 h-5" />
            </button>
          </div>

          <div class="grid grid-cols-2 gap-3 text-xs text-slate-700">
            <div>
              <span class="text-slate-400 text-[11px] block">Pemilik Usaha:</span>
              <strong class="text-slate-900">{{ activeDetailUmkm.owner_name }}</strong>
            </div>
            <div>
              <span class="text-slate-400 text-[11px] block">Kontak / Telepon:</span>
              <strong>{{ activeDetailUmkm.phone }}</strong>
            </div>
            <div>
              <span class="text-slate-400 text-[11px] block">Tahun Berdiri:</span>
              <strong>{{ activeDetailUmkm.established_year }}</strong>
            </div>
            <div>
              <span class="text-slate-400 text-[11px] block">Jumlah Tenaga Kerja:</span>
              <strong>{{ activeDetailUmkm.employee_count }} Orang</strong>
            </div>
            <div>
              <span class="text-slate-400 text-[11px] block">Kapasitas Produksi:</span>
              <strong>{{ activeDetailUmkm.production_capacity }}</strong>
            </div>
            <div>
              <span class="text-slate-400 text-[11px] block">Koordinat Spasial (POINT):</span>
              <span class="font-mono text-[10px] bg-slate-100 px-1 py-0.5 rounded">{{ activeDetailUmkm.latitude }}, {{ activeDetailUmkm.longitude }}</span>
            </div>
          </div>

          <div class="text-xs text-slate-700 border-t border-slate-100 pt-3">
            <span class="text-slate-400 text-[11px] block">Alamat Lengkap:</span>
            <p>{{ activeDetailUmkm.address }}, Desa {{ activeDetailUmkm.village_name }}, Kecamatan {{ activeDetailUmkm.district_name }}, Kabupaten Pamekasan, Jawa Timur</p>
          </div>

          <div class="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
            <ShieldCheck class="w-4 h-4 text-amber-700 flex-shrink-0" />
            <span>Data DEMO terverifikasi untuk pengujian fungsional Pekan 1.</span>
          </div>

          <div class="flex justify-end pt-2">
            <button
              @click="closeDetail"
              class="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

