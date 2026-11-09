<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Head, Link } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import type { EisKpiStats, Umkm } from '@/Types';
import { 
  Store, 
  Waves, 
  Fish, 
  MapPin, 
  TrendingUp, 
  ShieldCheck, 
  ExternalLink,
  Users,
  CheckCircle2,
  Calendar
} from 'lucide-vue-next';

const props = defineProps<{
  stats: EisKpiStats;
  recentUmkms: Umkm[];
}>();

const chartCanvas = ref<HTMLCanvasElement | null>(null);

onMounted(async () => {
  if (typeof window !== 'undefined' && chartCanvas.value) {
    const { Chart, registerables } = await import('chart.js');
    Chart.register(...registerables);

    new Chart(chartCanvas.value, {
      type: 'bar',
      data: {
        labels: props.stats.districts_summary.map(d => `Kec. ${d.district_name}`),
        datasets: [
          {
            label: 'Jumlah UMKM',
            data: props.stats.districts_summary.map(d => d.umkm_count),
            backgroundColor: '#10b981',
            borderRadius: 6,
          },
          {
            label: 'Luas Tambak (Hektar)',
            data: props.stats.districts_summary.map(d => d.salt_ponds_area_ha),
            backgroundColor: '#0284c7',
            borderRadius: 6,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            padding: 10,
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: '#f1f5f9',
            }
          },
          x: {
            grid: {
              display: false,
            }
          }
        }
      }
    });
  }
});
</script>

<template>
  <AppLayout title="Dashboard EIS & Operasional UMKM Pamekasan">
    <Head title="Dashboard EIS & Operasional" />

    <div class="space-y-6">
      <!-- Welcome Header -->
      <div class="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 p-6 rounded-2xl text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2 border border-emerald-500/30">
            <CheckCircle2 class="w-3.5 h-3.5" />
            <span>Sistem Berjalan — Pekan 1 Fondasi Arsitektur Selesai</span>
          </div>
          <h2 class="text-xl md:text-2xl font-black tracking-tight">
            Dashboard EIS & ERP Garam & Olahan Laut Pamekasan
          </h2>
          <p class="text-xs md:text-sm text-slate-300 mt-1 max-w-2xl">
            Monitoring terpadu operasional UMKM, inventaris tambak garam, rantai pasok pengolahan hasil laut, serta validasi mutu perangkat lunak berbasis ISO/IEC/IEEE 29119.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <Link
            href="/gis"
            class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <MapPin class="w-4 h-4" />
            <span>Buka WebGIS Pamekasan</span>
          </Link>
          <Link
            href="/sqa"
            class="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all flex items-center gap-2"
          >
            <ShieldCheck class="w-4 h-4" />
            <span>Dokumen SQA Pekan 1</span>
          </Link>
        </div>
      </div>

      <!-- KPI Statistics Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Card 1 -->
        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Store class="w-6 h-6" />
          </div>
          <div>
            <p class="text-xs font-medium text-slate-500">Total UMKM Terdata</p>
            <h3 class="text-2xl font-extrabold text-slate-900 mt-0.5">{{ stats.total_umkm }}</h3>
            <p class="text-[11px] text-emerald-600 font-semibold mt-0.5">8 Kategori Usaha Terdaftar</p>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
            <Waves class="w-6 h-6" />
          </div>
          <div>
            <p class="text-xs font-medium text-slate-500">Sektor Garam Rakyat</p>
            <h3 class="text-2xl font-extrabold text-slate-900 mt-0.5">{{ stats.total_umkm_garam }} <span class="text-xs font-normal text-slate-400">unit</span></h3>
            <p class="text-[11px] text-sky-600 font-semibold mt-0.5">{{ stats.total_salt_harvest_ton }} Ton Hasil Panen</p>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
            <Fish class="w-6 h-6" />
          </div>
          <div>
            <p class="text-xs font-medium text-slate-500">Sektor Olahan Laut</p>
            <h3 class="text-2xl font-extrabold text-slate-900 mt-0.5">{{ stats.total_umkm_olahan_laut }} <span class="text-xs font-normal text-slate-400">unit</span></h3>
            <p class="text-[11px] text-orange-600 font-semibold mt-0.5">{{ stats.total_seafood_output_ton }} Ton Produk Jadi</p>
          </div>
        </div>

        <!-- Card 4 -->
        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <TrendingUp class="w-6 h-6" />
          </div>
          <div>
            <p class="text-xs font-medium text-slate-500">Estimasi Nilai Transaksi</p>
            <h3 class="text-xl font-extrabold text-slate-900 mt-0.5">Rp {{ (stats.total_revenue_idr / 1000000).toFixed(1) }} Jt</h3>
            <p class="text-[11px] text-purple-600 font-semibold mt-0.5">Integrasi ERP & EIS</p>
          </div>
        </div>
      </div>

      <!-- Charts & Tables Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Chart: Persebaran Kecamatan (2 cols) -->
        <div class="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 class="font-bold text-sm text-slate-800">Distribusi Spasial per Kecamatan</h3>
              <p class="text-xs text-slate-500">Perbandingan jumlah UMKM dan luas tambak di Pademawu, Galis, dan Tlanakan.</p>
            </div>
            <span class="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">Data Riil / Demo SQA</span>
          </div>
          <div class="h-64">
            <canvas ref="chartCanvas"></canvas>
          </div>
        </div>

        <!-- Quick Summary & Recent Activities (1 col) -->
        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col space-y-4">
          <div class="border-b border-slate-100 pb-3">
            <h3 class="font-bold text-sm text-slate-800">Daftar UMKM Terbaru</h3>
            <p class="text-xs text-slate-500">Sampel UMKM terintegrasi WebGIS.</p>
          </div>

          <div class="space-y-3 flex-1 overflow-y-auto">
            <div 
              v-for="item in recentUmkms.slice(0, 4)" 
              :key="item.id"
              class="p-3 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
            >
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="text-xs font-bold text-slate-900">{{ item.name }}</h4>
                  <p class="text-[11px] text-slate-500">{{ item.owner_name }} — Desa {{ item.village_name }}</p>
                </div>
                <span :class="item.sector === 'garam' ? 'bg-sky-100 text-sky-800' : 'bg-orange-100 text-orange-800'" class="text-[9px] font-bold px-1.5 py-0.5 rounded">
                  {{ item.sector === 'garam' ? 'Garam' : 'Olahan' }}
                </span>
              </div>
              <div class="mt-2 text-[10px] text-slate-400 flex items-center justify-between">
                <span>Kec. {{ item.district_name }}</span>
                <span class="text-emerald-600 font-semibold">{{ item.production_capacity }}</span>
              </div>
            </div>
          </div>

          <Link
            href="/umkm"
            class="text-xs text-center font-semibold text-emerald-600 hover:text-emerald-700 py-1.5 border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors"
          >
            Lihat Semua Direktori UMKM →
          </Link>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

