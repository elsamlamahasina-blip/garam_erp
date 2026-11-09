<script setup lang="ts">
import { ref, computed } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import type { User } from '@/Types';
import { 
  LayoutDashboard, 
  MapPin, 
  Store, 
  Waves, 
  Boxes, 
  BookOpen, 
  Factory, 
  Warehouse, 
  ShoppingCart, 
  BadgePercent, 
  Calculator, 
  Truck, 
  LineChart, 
  ShieldCheck, 
  Workflow, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  AlertTriangle,
  UserCheck
} from 'lucide-vue-next';

defineProps<{
  title?: string;
}>();

const page = usePage();
const currentUser = computed<User>(() => page.props.auth?.user || {
  id: 1,
  name: 'Admin Demo SQA',
  email: 'admin@madura-erp.id',
  role: 'admin'
});

const isMobileMenuOpen = ref(false);

const navigationItems = [
  { name: 'Dashboard EIS', href: '/dashboard', icon: LayoutDashboard, role: ['admin', 'pimpinan', 'umkm'] },
  { name: 'Peta WebGIS', href: '/gis', icon: MapPin, role: ['admin', 'pimpinan', 'umkm'] },
  { name: 'Data UMKM', href: '/umkm', icon: Store, role: ['admin', 'pimpinan', 'umkm'] },
  { name: 'Data Tambak Garam', href: '/salt-ponds', icon: Waves, role: ['admin', 'pimpinan', 'umkm'] },
  { name: 'Bahan Baku', href: '/materials', icon: Boxes, role: ['admin', 'umkm'] },
  { name: 'Produk & Resep (BOM)', href: '/recipes', icon: BookOpen, role: ['admin', 'umkm'] },
  { name: 'Produksi (Batch)', href: '/production', icon: Factory, role: ['admin', 'umkm'] },
  { name: 'Persediaan / Stok', href: '/inventory', icon: Warehouse, role: ['admin', 'umkm'] },
  { name: 'Pembelian (Purchasing)', href: '/purchasing', icon: ShoppingCart, role: ['admin', 'umkm'] },
  { name: 'Penjualan (Sales)', href: '/sales', icon: BadgePercent, role: ['admin', 'umkm'] },
  { name: 'HPP & Biaya Produksi', href: '/costing', icon: Calculator, role: ['admin', 'umkm'] },
  { name: 'Distribusi & Logistik', href: '/distribution', icon: Truck, role: ['admin', 'umkm'] },
  { name: 'Laporan EIS Eksekutif', href: '/reports', icon: LineChart, role: ['admin', 'pimpinan'] },
  { name: 'Penjaminan Mutu (SQA)', href: '/sqa', icon: ShieldCheck, role: ['admin', 'pimpinan', 'umkm'] },
  { name: 'Implementasi Sistem', href: '/implementation', icon: Workflow, role: ['admin'] },
  { name: 'Pengaturan Sistem', href: '/settings', icon: Settings, role: ['admin'] },
];

const currentUrl = computed(() => page.url);

function isAllowed(roles: string[]) {
  return roles.includes(currentUser.value.role);
}

const roleBadgeColor = computed(() => {
  switch (currentUser.value.role) {
    case 'admin': return 'bg-purple-100 text-purple-700 border-purple-300';
    case 'pimpinan': return 'bg-blue-100 text-blue-700 border-blue-300';
    case 'umkm': return 'bg-emerald-100 text-emerald-700 border-emerald-300';
    default: return 'bg-slate-100 text-slate-700 border-slate-300';
  }
});

const roleLabel = computed(() => {
  switch (currentUser.value.role) {
    case 'admin': return 'Administrator Sistem';
    case 'pimpinan': return 'Pimpinan / Eksekutif';
    case 'umkm': return 'Pelaku UMKM / Petambak';
    default: return 'Pengguna';
  }
});
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex flex-col antialiased">
    <!-- Top banner for SQA Project status -->
    <div class="bg-slate-900 text-white text-xs px-4 py-1.5 flex justify-between items-center border-b border-slate-800">
      <div class="flex items-center gap-2">
        <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          PEKAN 1
        </span>
        <span class="font-medium">MADURA ERP/EIS — UMKM Garam & Olahan Laut Kab. Pamekasan</span>
        <span class="hidden md:inline text-slate-400">| PjBL S1 Sistem Informasi Universitas Islam Madura</span>
      </div>
      <div class="flex items-center gap-2 text-amber-300 font-mono text-[11px]">
        <AlertTriangle class="w-3.5 h-3.5" />
        <span>Spasial: DEMO DATA (Tervalidasi ISO 29119)</span>
      </div>
    </div>

    <!-- Main Shell -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Sidebar Desktop -->
      <aside class="hidden lg:flex lg:flex-col w-64 bg-white border-r border-slate-200">
        <!-- Brand -->
        <div class="h-16 flex items-center px-6 border-b border-slate-200 bg-slate-900 text-white">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center font-extrabold text-white text-lg shadow-sm">
              M
            </div>
            <div>
              <div class="font-bold text-sm tracking-wide">MADURA ERP/EIS</div>
              <div class="text-[10px] text-slate-400 uppercase tracking-wider">Kab. Pamekasan</div>
            </div>
          </div>
        </div>

        <!-- Navigation Links -->
        <nav class="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div class="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Modul Utama ERP & GIS
          </div>

          <template v-for="item in navigationItems" :key="item.name">
            <Link
              v-if="isAllowed(item.role)"
              :href="item.href"
              :class="[
                currentUrl.startsWith(item.href)
                  ? 'bg-emerald-50 text-emerald-700 font-semibold border-r-4 border-emerald-600'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium',
                'group flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-colors'
              ]"
            >
              <component 
                :is="item.icon" 
                class="w-4 h-4 flex-shrink-0"
                :class="currentUrl.startsWith(item.href) ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-600'" 
              />
              <span class="truncate">{{ item.name }}</span>
            </Link>
          </template>
        </nav>

        <!-- Current User Info in Sidebar Footer -->
        <div class="p-4 border-t border-slate-200 bg-slate-50/80">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">
              {{ currentUser.name.charAt(0) }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-xs font-semibold text-slate-900 truncate">{{ currentUser.name }}</p>
              <div class="flex items-center gap-1.5 mt-0.5">
                <span :class="['text-[9px] px-1.5 py-0.2 rounded font-semibold border', roleBadgeColor]">
                  {{ roleLabel }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content Area -->
      <div class="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <!-- Top App Bar -->
        <header class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-10 shadow-sm">
          <div class="flex items-center gap-3">
            <button 
              @click="isMobileMenuOpen = !isMobileMenuOpen"
              class="lg:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100"
              aria-label="Toggle Menu"
            >
              <Menu class="w-5 h-5" />
            </button>
            <h1 class="text-base font-bold text-slate-800 tracking-tight">
              {{ title || 'Sistem ERP, WebGIS, dan EIS UMKM Pamekasan' }}
            </h1>
          </div>

          <div class="flex items-center gap-3">
            <!-- Role indicator button -->
            <div class="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-100 text-xs text-slate-700">
              <UserCheck class="w-3.5 h-3.5 text-emerald-600" />
              <span>Role Aktif: <strong class="text-slate-900 capitalize">{{ currentUser.role }}</strong></span>
            </div>

            <!-- Switch demo role link -->
            <Link 
              href="/login" 
              class="text-xs px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium flex items-center gap-1.5"
            >
              <LogOut class="w-3.5 h-3.5" />
              <span>Ganti Akun Demo</span>
            </Link>
          </div>
        </header>

        <!-- Main View Body -->
        <main class="flex-1 p-4 sm:p-6 lg:p-8">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

