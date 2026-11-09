/**
 * SIGARA-PAMEKASAN: Sistem Informasi Garam & UMKM Olahan Laut Kabupaten Pamekasan
 * Standard: ISO/IEC/IEEE 29119 Quality Assurance
 * Platform: PjBL S1 Sistem Informasi Universitas Islam Madura (MKB020204)
 */

import http from 'http';
import url from 'url';
import fs from 'fs';
import path from 'path';
import os from 'os';

const PORT = process.env.PORT || 8000;
const DATA_FILE = path.join(process.cwd(), 'database', 'umkm_store.json');

function getLocalIp() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return '192.168.1.7';
}

const HOST_IP = getLocalIp();

// Master Data: UMKM Olahan Laut & Garam Pamekasan
const defaultUmkms = [
  {
    id: 1,
    code: 'UMK-OLH-001',
    name: 'UD. Sari Laut',
    owner_name: 'Bapak H. Syaiful Anwar',
    sector: 'olahan_laut',
    category: 'olahan_ikan',
    category_label: 'Produk Olahan Ikan',
    products: 'Ikan Bakar, Ikan Asin, Teri Crispy',
    scale: 'Kecil',
    address: 'Jl. Raya Pelabuhan Branta Pesisir No. 18',
    district_name: 'Tlanakan',
    village_name: 'Branta Pesisir',
    phone: '0812-3456-7890',
    latitude: -7.2285,
    longitude: 113.4590,
    established_year: 2017,
    production_capacity: '1.2 Ton/bulan',
    employee_count: 8,
    status: 'aktif',
    is_demo: true,
    notes: 'Spesialis olahan ikan bakar bumbu Madura dan aneka ikan asin higienis.'
  },
  {
    id: 2,
    code: 'UMK-OLH-002',
    name: 'UMKM Rengginang Ikan & Lorjuk Bu Siti',
    owner_name: 'Ibu Siti Rohani',
    sector: 'olahan_laut',
    category: 'rengginang_ikan',
    category_label: 'Rengginang Ikan & Lorjuk',
    products: 'Rengginang Lorjuk, Rengginang Ikan Tongkol, Kerupuk Terung',
    scale: 'Mikro',
    address: 'Dusun Pesisir RT 03/RW 01',
    district_name: 'Tlanakan',
    village_name: 'Branta Pesisir',
    phone: '0813-7788-9900',
    latitude: -7.2260,
    longitude: 113.4540,
    established_year: 2015,
    production_capacity: '300 Kg/hari',
    employee_count: 12,
    status: 'aktif',
    is_demo: true,
    notes: 'Rengginang ketan premium campuran kaldu lorjuk dan ikan tongkol.'
  },
  {
    id: 3,
    code: 'UMK-OLH-003',
    name: 'Sentra Kerupuk Ikan Tenggiri Barokah',
    owner_name: 'Bambang Irawan',
    sector: 'olahan_laut',
    category: 'kerupuk_ikan',
    category_label: 'Kerupuk Ikan Pesisir',
    products: 'Kerupuk Ikan Tenggiri, Kerupuk Payus, Kerupuk Ikan Belida',
    scale: 'Kecil',
    address: 'Dusun Pesisir Indah RT 02',
    district_name: 'Pademawu',
    village_name: 'Padelegan',
    phone: '0819-2233-4455',
    latitude: -7.2215,
    longitude: 113.5430,
    established_year: 2019,
    production_capacity: '800 Kg/bulan',
    employee_count: 7,
    status: 'aktif',
    is_demo: true,
    notes: 'Kerupuk tenggiri oven higienis bebas pengawet berbahaya.'
  },
  {
    id: 4,
    code: 'UMK-OLH-004',
    name: 'Olahan Abon Ikan Tuna & Nugget Kramat',
    owner_name: 'Ibu Nurul Hidayah',
    sector: 'olahan_laut',
    category: 'olahan_ikan',
    category_label: 'Produk Olahan Ikan',
    products: 'Abon Ikan Tuna, Nugget Ikan Laut, Bakso Ikan Segar',
    scale: 'Mikro',
    address: 'Jl. Pelabuhan Rakyat Kramat No. 05',
    district_name: 'Tlanakan',
    village_name: 'Kramat',
    phone: '0852-3344-5566',
    latitude: -7.2150,
    longitude: 113.4720,
    established_year: 2021,
    production_capacity: '450 Kg/bulan',
    employee_count: 6,
    status: 'aktif',
    is_demo: true,
    notes: 'Abon tuna rempah khas Madura kemasan ziplock tahan 6 bulan.'
  },
  {
    id: 5,
    code: 'UMK-OLH-005',
    name: 'Sentra Petis & Sambal Lorjuk Samudera',
    owner_name: 'Drs. Subhan',
    sector: 'olahan_laut',
    category: 'olahan_udang',
    category_label: 'Olahan Udang & Lorjuk',
    products: 'Petis Udang Madura, Petis Lorjuk Super, Sambal Cumi Asin',
    scale: 'Kecil',
    address: 'Sentra Pesisir Polagan RT 04',
    district_name: 'Galis',
    village_name: 'Polagan',
    phone: '0878-1122-3344',
    latitude: -7.2050,
    longitude: 113.5820,
    established_year: 2016,
    production_capacity: '1.500 Botol/bulan',
    employee_count: 9,
    status: 'aktif',
    is_demo: true,
    notes: 'Petis udang manis dan petis lorjuk gurih resep turun temurun.'
  },
  {
    id: 6,
    code: 'UMK-OLH-006',
    name: 'Terasi Udang Rebon Asli Pagagan',
    owner_name: 'Ibu Halimah',
    sector: 'olahan_laut',
    category: 'terasi_dan_hasil_laut',
    category_label: 'Terasi & Hasil Laut',
    products: 'Terasi Udang Rebon Murni, Terasi Bakar Wangi',
    scale: 'Mikro',
    address: 'Dusun Karang Pagagan RT 01',
    district_name: 'Pademawu',
    village_name: 'Pagagan',
    phone: '0812-7766-5544',
    latitude: -7.2180,
    longitude: 113.5350,
    established_year: 2014,
    production_capacity: '2 Ton/bulan',
    employee_count: 11,
    status: 'aktif',
    is_demo: true,
    notes: 'Fermentasi udang rebon asli pesisir Madura tanpa pewarna buatan.'
  },
  {
    id: 7,
    code: 'UMK-OLH-007',
    name: 'Sentra Teri Nasi & Cumi Kering Pasean',
    owner_name: 'H. Achmad Baihaki',
    sector: 'olahan_laut',
    category: 'olahan_ikan',
    category_label: 'Produk Olahan Ikan',
    products: 'Teri Nasi Kering (Whitebait), Cumi Asin Kering, Ikan Peda',
    scale: 'Menengah',
    address: 'Kawasan Pesisir Pantai Utara Pasean No. 22',
    district_name: 'Pasean',
    village_name: 'Pasean',
    phone: '0813-8899-0011',
    latitude: -6.8920,
    longitude: 113.5510,
    established_year: 2013,
    production_capacity: '5 Ton/bulan',
    employee_count: 18,
    status: 'aktif',
    is_demo: true,
    notes: 'Sentra pengeringan ikan teri nasi putih dan cumi asin higienis pantura.'
  },
  {
    id: 8,
    code: 'UMK-OLH-008',
    name: 'Otak-Otak & Pempek Ikan Bandaran',
    owner_name: 'Ibu Wardah',
    sector: 'olahan_laut',
    category: 'olahan_ikan',
    category_label: 'Produk Olahan Ikan',
    products: 'Otak-Otak Ikan Daun Pisang, Pempek Ikan Laut, Bakso Ikan',
    scale: 'Mikro',
    address: 'Jl. Raya Bandaran No. 14',
    district_name: 'Tlanakan',
    village_name: 'Bandaran',
    phone: '0857-4455-6677',
    latitude: -7.2240,
    longitude: 113.4680,
    established_year: 2020,
    production_capacity: '500 Porsi/hari',
    employee_count: 5,
    status: 'aktif',
    is_demo: true,
    notes: 'Olahan ikan segar tangkapan nelayan Bandaran dengan bumbu petis pedas.'
  },
  {
    id: 9,
    code: 'UMK-GRM-001',
    name: 'Kelompok Petambak Garam Majungan Makmur',
    owner_name: 'H. Achmad Syafi\'i',
    sector: 'garam',
    category: 'petambak_garam',
    category_label: 'Petambak Garam Rakyat',
    products: 'Garam Kasar Krosok Geomembran, Garam Kristal',
    scale: 'Menengah',
    address: 'Jl. Pesisir Tambak Selatan No. 12',
    district_name: 'Pademawu',
    village_name: 'Majungan',
    phone: '0812-3456-7801',
    latitude: -7.2150,
    longitude: 113.5280,
    established_year: 2014,
    production_capacity: '350 Ton/musim',
    employee_count: 14,
    status: 'aktif',
    is_demo: true,
    notes: 'Lahan kristalisasi garam geomembran seluas 7.7 Hektar.'
  },
  {
    id: 10,
    code: 'UMK-GRM-002',
    name: 'UD Pengolahan Garam Bunder Berkah',
    owner_name: 'Mahrus Ali',
    sector: 'garam',
    category: 'pengolahan_garam',
    category_label: 'Pengolahan Garam',
    products: 'Garam Cuci Bersih Industri, Garam Halus Beryodium',
    scale: 'Kecil',
    address: 'Dusun Bunder Barat RT 02/RW 01',
    district_name: 'Pademawu',
    village_name: 'Bunder',
    phone: '0812-3456-7802',
    latitude: -7.2025,
    longitude: 113.5180,
    established_year: 2018,
    production_capacity: '15 Ton/minggu',
    employee_count: 8,
    status: 'aktif',
    is_demo: true,
    notes: 'Sentra pencucian dan penggilingan garam krosok menjadi garam bersih.'
  },
  {
    id: 11,
    code: 'UMK-GRM-003',
    name: 'Koperasi Garam Konsumsi Galis Mandiri',
    owner_name: 'Hj. Fatimah Zahra',
    sector: 'garam',
    category: 'garam_konsumsi',
    category_label: 'Garam Konsumsi Beriodium',
    products: 'Garam Dapur Beriodium Kemasan 250g & 500g',
    scale: 'Kecil',
    address: 'Jl. Raya Sentra Garam Galis No. 88',
    district_name: 'Galis',
    village_name: 'Galis',
    phone: '0812-3456-7803',
    latitude: -7.1850,
    longitude: 113.5650,
    established_year: 2019,
    production_capacity: '8 Ton/bulan',
    employee_count: 7,
    status: 'aktif',
    is_demo: true,
    notes: 'Produksi garam konsumsi SNI beriodium dengan kemasan higienis.'
  }
];

function getUmkmStore() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    }
  } catch (e) {
    console.error('Error reading umkm store', e);
  }
  saveUmkmStore(defaultUmkms);
  return defaultUmkms;
}

function saveUmkmStore(data) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error saving umkm store', e);
  }
}

let umkms = getUmkmStore();

// Polygons for Salt Ponds
const saltPonds = [
  {
    id: 1,
    umkm_id: 9,
    umkm_name: 'Kelompok Petambak Garam Majungan Makmur',
    code: 'TBK-MJG-A1',
    area_sqm: 45000,
    district_name: 'Pademawu',
    village_name: 'Majungan',
    production_season: 'Musim Kemarau 2026',
    is_demo: true,
    coordinates: [
      [
        [113.5265, -7.2145],
        [113.5315, -7.2145],
        [113.5315, -7.2175],
        [113.5265, -7.2175],
        [113.5265, -7.2145]
      ]
    ]
  },
  {
    id: 2,
    umkm_id: 9,
    umkm_name: 'Kelompok Petambak Garam Majungan Makmur',
    code: 'TBK-MJG-A2',
    area_sqm: 32000,
    district_name: 'Pademawu',
    village_name: 'Majungan',
    production_season: 'Musim Kemarau 2026',
    is_demo: true,
    coordinates: [
      [
        [113.5270, -7.2180],
        [113.5320, -7.2180],
        [113.5320, -7.2210],
        [113.5270, -7.2210],
        [113.5270, -7.2180]
      ]
    ]
  },
  {
    id: 3,
    umkm_id: 5,
    umkm_name: 'Sentra Lahan Garam Rakyat Polagan',
    code: 'TBK-PLG-01',
    area_sqm: 28000,
    district_name: 'Galis',
    village_name: 'Polagan',
    production_season: 'Musim Kemarau 2026',
    is_demo: true,
    coordinates: [
      [
        [113.5800, -7.2040],
        [113.5850, -7.2040],
        [113.5850, -7.2070],
        [113.5800, -7.2070],
        [113.5800, -7.2040]
      ]
    ]
  }
];

// Tempat Pelelangan Ikan (TPI)
const tpiLocations = [
  {
    id: 1,
    name: 'TPI Branta Pesisir (Pelabuhan Pendaratan Ikan)',
    district_name: 'Tlanakan',
    village_name: 'Branta Pesisir',
    capacity: '15 Ton Hasil Tangkap/Hari',
    latitude: -7.2315,
    longitude: 113.4560,
    phone: '0812-4455-6611'
  },
  {
    id: 2,
    name: 'TPI Kramat Tlanakan',
    district_name: 'Tlanakan',
    village_name: 'Kramat',
    capacity: '8 Ton Hasil Tangkap/Hari',
    latitude: -7.2170,
    longitude: 113.4735,
    phone: '0812-4455-6622'
  },
  {
    id: 3,
    name: 'TPI Pasean Pantura Pamekasan',
    district_name: 'Pasean',
    village_name: 'Pasean',
    capacity: '25 Ton Hasil Tangkap/Hari',
    latitude: -6.8900,
    longitude: 113.5530,
    phone: '0812-4455-6633'
  }
];

// Helper: parse cookies from request
function parseCookies(req) {
  const list = {};
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return list;
  cookieHeader.split(';').forEach(cookie => {
    let [name, ...rest] = cookie.split('=');
    name = name?.trim();
    if (!name) return;
    const value = rest.join('=').trim();
    list[name] = decodeURIComponent(value);
  });
  return list;
}

// Global active session state fallback (memory + cookie)
let globalUser = null;

function getCurrentUser(req) {
  const cookies = parseCookies(req);
  if (cookies.sigara_user) {
    try {
      return JSON.parse(cookies.sigara_user);
    } catch (e) {}
  }
  return globalUser;
}

// Navigation HTML for Desktop & Mobile
function getNavigationHtml(activeTab, currentUser) {
  const userSection = currentUser
    ? `
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-2 bg-slate-50 border border-slate-200 py-1 px-2.5 rounded-full">
          <div class="w-6 h-6 rounded-full bg-gradient-to-tr from-sky-600 to-emerald-500 text-white flex items-center justify-center font-bold text-xs uppercase shadow-xs">
            ${currentUser.name ? currentUser.name.charAt(0) : 'U'}
          </div>
          <div class="hidden sm:block text-left">
            <p class="text-[11px] font-bold text-slate-900 leading-none truncate max-w-[120px]">${currentUser.name}</p>
            <p class="text-[9px] text-slate-500 font-mono truncate max-w-[120px]">${currentUser.email}</p>
          </div>
        </div>
        <button onclick="handleLogout()" title="Keluar Akun" class="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
        </button>
      </div>
    `
    : `
      <a href="/login" class="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white shadow-xs transition-all">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.761H12.545z"/></svg>
        <span>Masuk Akun</span>
      </a>
    `;

  return `
    <header class="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <!-- Logo -->
        <a href="/" class="flex items-center gap-2.5 group">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 15c2.5-2 5-2 7.5 0s5 2 7.5 0 2.5-2 3-2"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 19c2.5-2 5-2 7.5 0s5 2 7.5 0 2.5-2 3-2"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4l3 5H9l3-5z"/>
            </svg>
          </div>
          <div>
            <div class="font-extrabold text-slate-900 text-sm tracking-wide group-hover:text-sky-600 transition-colors">
              SIGARA-PAMEKASAN
            </div>
            <div class="text-[9px] text-slate-500 font-semibold -mt-0.5">
              UMKM Olahan Laut & Garam Pamekasan
            </div>
          </div>
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-6 text-xs font-semibold">
          <a href="/beranda" class="${activeTab === 'beranda' ? 'text-sky-600 font-bold' : 'text-slate-600 hover:text-sky-600'} flex items-center gap-1.5 transition-colors">
            <span>Beranda</span>
          </a>
          <a href="/peta" class="${activeTab === 'peta' ? 'text-sky-600 font-bold' : 'text-slate-600 hover:text-sky-600'} flex items-center gap-1.5 transition-colors">
            <span>Peta Utama</span>
          </a>
          <a href="/direktori" class="${activeTab === 'direktori' ? 'text-sky-600 font-bold' : 'text-slate-600 hover:text-sky-600'} flex items-center gap-1.5 transition-colors">
            <span>Direktori</span>
          </a>
          <a href="/statistik" class="${activeTab === 'statistik' ? 'text-sky-600 font-bold' : 'text-slate-600 hover:text-sky-600'} flex items-center gap-1.5 transition-colors">
            <span>Statistik</span>
          </a>
          <button onclick="openAddUmkmModal()" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100 font-bold text-xs transition-colors">
            <span>+ Daftarkan Usaha</span>
          </button>
        </nav>

        <!-- Right User Section -->
        <div class="flex items-center gap-3">
          ${userSection}
        </div>
      </div>
    </header>

    <!-- Mobile Bottom Navigation Bar (Optimized for Smartphone) -->
    <div class="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex justify-around items-center text-[10px] font-semibold text-slate-600 shadow-lg">
      <a href="/beranda" class="flex flex-col items-center gap-0.5 p-1 ${activeTab === 'beranda' ? 'text-sky-600 font-bold' : ''}">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
        <span>Beranda</span>
      </a>
      <a href="/peta" class="flex flex-col items-center gap-0.5 p-1 ${activeTab === 'peta' ? 'text-sky-600 font-bold' : ''}">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
        <span>Peta</span>
      </a>
      <button onclick="openAddUmkmModal()" class="flex flex-col items-center gap-0.5 p-1 text-sky-700">
        <div class="w-7 h-7 rounded-full bg-sky-600 text-white flex items-center justify-center -mt-3 shadow-md font-bold text-base">
          +
        </div>
        <span>Tambah</span>
      </button>
      <a href="/direktori" class="flex flex-col items-center gap-0.5 p-1 ${activeTab === 'direktori' ? 'text-sky-600 font-bold' : ''}">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>
        <span>Direktori</span>
      </a>
      <a href="/statistik" class="flex flex-col items-center gap-0.5 p-1 ${activeTab === 'statistik' ? 'text-sky-600 font-bold' : ''}">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
        <span>Statistik</span>
      </a>
    </div>
  `;
}

// Modal Tambah Usaha
function getAddUmkmModalHtml() {
  return `
    <div id="addUmkmModal" class="fixed inset-0 z-50 hidden bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div class="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-100 my-8">
        <div class="flex justify-between items-start pb-3 border-b border-slate-100">
          <div>
            <h3 class="font-bold text-base text-slate-900">Daftarkan UMKM Olahan Laut / Garam</h3>
            <p class="text-xs text-slate-500">Tambahkan titik usaha Anda ke dalam peta SIGARA Pamekasan.</p>
          </div>
          <button onclick="closeAddUmkmModal()" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg">✕</button>
        </div>

        <form id="addUmkmForm" onsubmit="submitNewUmkm(event)" class="mt-4 space-y-3 text-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Nama Usaha / Merk: *</label>
              <input type="text" id="mName" required placeholder="Contoh: UD. Nelayan Berkah" class="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none" />
            </div>
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Nama Pemilik: *</label>
              <input type="text" id="mOwner" required placeholder="Contoh: H. Mahfud" class="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Kategori Usaha: *</label>
              <select id="mCategory" required class="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none bg-white">
                <option value="olahan_ikan">Produk Olahan Ikan (Ikan Asin, Bakar, Abon)</option>
                <option value="rengginang_ikan">Rengginang Ikan & Lorjuk</option>
                <option value="kerupuk_ikan">Kerupuk Ikan & Terung Laut</option>
                <option value="olahan_udang">Olahan Udang & Lorjuk (Petis)</option>
                <option value="terasi_dan_hasil_laut">Terasi & Fermentasi Laut</option>
                <option value="petambak_garam">Petambak Garam Rakyat</option>
                <option value="pengolahan_garam">Pengolahan Garam</option>
                <option value="garam_konsumsi">Garam Konsumsi Beryodium</option>
              </select>
            </div>
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Skala Usaha: *</label>
              <select id="mScale" required class="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none bg-white">
                <option value="Mikro">Usaha Mikro</option>
                <option value="Kecil" selected>Usaha Kecil</option>
                <option value="Menengah">Usaha Menengah</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block font-semibold text-slate-700 mb-1">Produk Unggulan: *</label>
            <input type="text" id="mProducts" required placeholder="Contoh: Ikan Bakar Madura, Cumi Kering, Teri Crispy" class="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none" />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Kecamatan: *</label>
              <select id="mDistrict" required class="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none bg-white">
                <option value="Pademawu">Kecamatan Pademawu</option>
                <option value="Tlanakan">Kecamatan Tlanakan</option>
                <option value="Galis">Kecamatan Galis</option>
                <option value="Pasean">Kecamatan Pasean</option>
                <option value="Pamekasan">Kecamatan Pamekasan</option>
                <option value="Larangan">Kecamatan Larangan</option>
                <option value="Kadur">Kecamatan Kadur</option>
              </select>
            </div>
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Desa / Kelurahan: *</label>
              <input type="text" id="mVillage" required placeholder="Contoh: Branta Pesisir" class="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold text-slate-700 mb-1">No. Kontak / WA: *</label>
              <input type="text" id="mPhone" required placeholder="0812-3456-7890" class="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none" />
            </div>
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Kapasitas Produksi:</label>
              <input type="text" id="mCapacity" placeholder="Contoh: 500 Kg/bulan" class="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none" />
            </div>
          </div>

          <div>
            <label class="block font-semibold text-slate-700 mb-1">Alamat Lengkap:</label>
            <input type="text" id="mAddress" required placeholder="Jl. Pantai Nelayan No..." class="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none" />
          </div>

          <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div class="flex justify-between items-center mb-1.5">
              <span class="font-bold text-slate-700 text-[11px]">Titik Koordinat Lokasi Peta (POINT)</span>
              <button type="button" onclick="useCurrentLocation()" class="text-sky-600 hover:text-sky-700 text-[10px] font-semibold">📍 Ambil Lokasi Saya</button>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <span class="text-[10px] text-slate-500">Latitude:</span>
                <input type="number" step="any" id="mLat" required placeholder="-7.2285" class="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs" />
              </div>
              <div>
                <span class="text-[10px] text-slate-500">Longitude:</span>
                <input type="number" step="any" id="mLng" required placeholder="113.4590" class="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs" />
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-2 pt-2">
            <button type="button" onclick="closeAddUmkmModal()" class="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-50 font-semibold">Batal</button>
            <button type="submit" class="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold shadow-md">Simpan Usaha</button>
          </div>
        </form>
      </div>
    </div>

    <script>
      function openAddUmkmModal() { document.getElementById('addUmkmModal').classList.remove('hidden'); }
      function closeAddUmkmModal() { document.getElementById('addUmkmModal').classList.add('hidden'); }

      function useCurrentLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((pos) => {
            document.getElementById('mLat').value = pos.coords.latitude.toFixed(6);
            document.getElementById('mLng').value = pos.coords.longitude.toFixed(6);
          }, () => {
            document.getElementById('mLat').value = '-7.228500';
            document.getElementById('mLng').value = '113.459000';
          });
        }
      }

      async function submitNewUmkm(e) {
        e.preventDefault();
        const newUmkm = {
          name: document.getElementById('mName').value,
          owner_name: document.getElementById('mOwner').value,
          category: document.getElementById('mCategory').value,
          scale: document.getElementById('mScale').value,
          products: document.getElementById('mProducts').value,
          district_name: document.getElementById('mDistrict').value,
          village_name: document.getElementById('mVillage').value,
          phone: document.getElementById('mPhone').value,
          address: document.getElementById('mAddress').value,
          capacity: document.getElementById('mCapacity').value || 'Tersedia',
          latitude: parseFloat(document.getElementById('mLat').value) || -7.2285,
          longitude: parseFloat(document.getElementById('mLng').value) || 113.4590
        };

        const res = await fetch('/api/v1/umkm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUmkm)
        });
        const resData = await res.json();
        if (resData.success) {
          alert('Berhasil! UMKM ' + newUmkm.name + ' berhasil didaftarkan dan dipetakan di WebGIS.');
          closeAddUmkmModal();
          window.location.reload();
        }
      }

      async function handleLogout() {
        await fetch('/api/v1/logout', { method: 'POST' });
        window.location.href = '/login';
      }
    </script>
  `;
}

// Request Handler
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;
  const currentUser = getCurrentUser(req);

  // API 1: Login via Gmail / Credentials
  if (pathname === '/api/v1/login' && method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const email = payload.email || 'user@gmail.com';
        let name = payload.name;
        if (!name) {
          // Extract name from gmail (e.g. elsa.madura@gmail.com -> Elsa Madura)
          const username = email.split('@')[0].replace(/[._-]/g, ' ');
          name = username.replace(/\\b\\w/g, l => l.toUpperCase());
        }

        let role = 'Pelaku UMKM Olahan Laut';
        if (email.includes('admin')) role = 'Administrator Sistem';
        else if (email.includes('garam')) role = 'Petambak Garam';
        else if (email.includes('dinas')) role = 'Dinas Perikanan Pamekasan';

        const userObj = { email, name, role, photo: '👤' };
        globalUser = userObj;

        // Set Cookie for persistent mobile and desktop session
        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Set-Cookie': `sigara_user=${encodeURIComponent(JSON.stringify(userObj))}; Path=/; Max-Age=2592000; SameSite=Lax`
        });
        return res.end(JSON.stringify({ success: true, user: userObj }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ success: false, error: 'Format data tidak sah.' }));
      }
    });
    return;
  }

  // API 2: Logout
  if (pathname === '/api/v1/logout' && method === 'POST') {
    globalUser = null;
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Set-Cookie': `sigara_user=; Path=/; Max-Age=0`
    });
    return res.end(JSON.stringify({ success: true }));
  }

  // API 3: UMKM Collection
  if (pathname === '/api/v1/umkm') {
    if (method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: true, count: umkms.length, data: umkms }));
    }

    if (method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const item = JSON.parse(body);
          const newId = umkms.length > 0 ? Math.max(...umkms.map(u => u.id)) + 1 : 1;
          const isSalt = item.category.includes('garam');

          let catLabel = 'Produk Olahan Ikan';
          if (item.category === 'rengginang_ikan') catLabel = 'Rengginang Ikan & Lorjuk';
          else if (item.category === 'kerupuk_ikan') catLabel = 'Kerupuk Ikan Pesisir';
          else if (item.category === 'olahan_udang') catLabel = 'Olahan Udang & Lorjuk';
          else if (item.category === 'terasi_dan_hasil_laut') catLabel = 'Terasi & Hasil Laut';
          else if (item.category === 'petambak_garam') catLabel = 'Petambak Garam Rakyat';
          else if (item.category === 'pengolahan_garam') catLabel = 'Pengolahan Garam';
          else if (item.category === 'garam_konsumsi') catLabel = 'Garam Konsumsi Beryodium';

          const created = {
            id: newId,
            code: isSalt ? `UMK-GRM-${String(newId).padStart(3, '0')}` : `UMK-OLH-${String(newId).padStart(3, '0')}`,
            name: item.name,
            owner_name: item.owner_name,
            sector: isSalt ? 'garam' : 'olahan_laut',
            category: item.category,
            category_label: catLabel,
            products: item.products,
            scale: item.scale || 'Kecil',
            address: item.address,
            district_name: item.district_name,
            village_name: item.village_name,
            phone: item.phone,
            latitude: Number(item.latitude),
            longitude: Number(item.longitude),
            established_year: new Date().getFullYear(),
            production_capacity: item.capacity || '500 Kg/bulan',
            employee_count: 5,
            status: 'aktif',
            is_demo: false,
            notes: 'Didaftarkan melalui portal SIGARA-PAMEKASAN'
          };

          umkms.unshift(created);
          saveUmkmStore(umkms);

          res.writeHead(201, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: true, data: created }));
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: false, error: 'Gagal memproses data usaha.' }));
        }
      });
      return;
    }
  }

  // =========================================================================
  // HALAMAN LOGIN AWAL — Tampilan Pertama Sebelum Masuk Beranda
  // =========================================================================
  if (pathname === '/login' || (pathname === '/' && !currentUser)) {
    const mobileQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=http://${HOST_IP}:${PORT}`;

    const html = `
      <!DOCTYPE html>
      <html lang="id">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
        <title>Masuk — SIGARA Pamekasan (UMKM Olahan Laut & Garam)</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
        <style>
          body { font-family: 'Plus Jakarta Sans', sans-serif; }
          .coastal-bg {
            background: linear-gradient(135deg, #0369a1 0%, #0284c7 50%, #0ea5e9 100%);
          }
        </style>
      </head>
      <body class="bg-slate-100 min-h-screen flex flex-col justify-between antialiased">
        <!-- Top Banner: Akses HP Info -->
        <div class="bg-sky-950 text-white text-xs px-4 py-2 border-b border-sky-900 flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span class="font-bold">Akses Handphone Aktif:</span>
            <code class="bg-sky-900 px-2 py-0.5 rounded text-sky-200 font-mono text-[11px]">http://${HOST_IP}:${PORT}</code>
          </div>
          <div class="text-[11px] text-sky-300">
            Hubungkan HP ke Wi-Fi yang sama untuk membuka di browser ponsel
          </div>
        </div>

        <!-- Main Login Container -->
        <div class="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div class="bg-white rounded-3xl shadow-xl border border-slate-200/80 max-w-md w-full overflow-hidden">
            <!-- Header Brand -->
            <div class="coastal-bg p-6 text-white text-center relative overflow-hidden">
              <div class="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
              
              <div class="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md mx-auto flex items-center justify-center text-white shadow-inner mb-3">
                <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 15c2.5-2 5-2 7.5 0s5 2 7.5 0 2.5-2 3-2"/>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 19c2.5-2 5-2 7.5 0s5 2 7.5 0 2.5-2 3-2"/>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4l3 5H9l3-5z"/>
                </svg>
              </div>

              <h1 class="text-xl font-extrabold tracking-wide">SIGARA-PAMEKASAN</h1>
              <p class="text-xs text-sky-100 mt-1 font-medium">Sistem Informasi Garam & UMKM Olahan Laut Pamekasan</p>
              <div class="inline-block mt-2 px-3 py-0.5 rounded-full bg-white/20 text-[10px] font-semibold text-white">
                Gerbang Masuk Pengguna & Pelaku Usaha
              </div>
            </div>

            <!-- Body Form -->
            <div class="p-6 sm:p-8 space-y-5">
              <!-- Google / Gmail Sign-In Button (Official Look) -->
              <div>
                <button type="button" onclick="promptGoogleLogin()" class="w-full py-3 px-4 bg-white hover:bg-slate-50 border border-slate-300 rounded-2xl text-slate-700 font-bold text-xs flex items-center justify-center gap-3 shadow-xs hover:shadow-md transition-all">
                  <svg class="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Lanjutkan dengan Akun Google / Gmail</span>
                </button>
              </div>

              <div class="relative flex items-center justify-center">
                <div class="border-t border-slate-200 w-full"></div>
                <span class="bg-white px-3 text-[10px] text-slate-400 uppercase font-bold tracking-wider">Atau Masukkan Gmail</span>
              </div>

              <!-- Form Email & Password -->
              <form id="emailLoginForm" onsubmit="handleDirectLogin(event)" class="space-y-3 text-xs">
                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Akun Gmail Pribadi: *</label>
                  <div class="relative">
                    <input 
                      type="email" 
                      id="inputEmail" 
                      required 
                      placeholder="contoh: elsa.pamekasan@gmail.com" 
                      class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none text-slate-800" 
                    />
                  </div>
                </div>

                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Nama Lengkap Pengguna: *</label>
                  <input 
                    type="text" 
                    id="inputName" 
                    required 
                    placeholder="Nama Anda atau Pemilik Usaha" 
                    class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none text-slate-800" 
                  />
                </div>

                <button type="submit" class="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
                  <span>Masuk ke Beranda SIGARA</span>
                  <span>→</span>
                </button>
              </form>

              <!-- Quick Demo Roles -->
              <div class="pt-2 border-t border-slate-100">
                <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 text-center">Atau Masuk 1-Klik dengan Akun Demo:</p>
                <div class="grid grid-cols-2 gap-2 text-[11px]">
                  <button type="button" onclick="quickFill('sarilaut@gmail.com', 'Bapak H. Syaiful Anwar (UD. Sari Laut)')" class="p-2 border border-sky-200 bg-sky-50 hover:bg-sky-100 rounded-xl text-left transition-colors">
                    <strong class="text-sky-900 block truncate">🐟 UD. Sari Laut</strong>
                    <span class="text-[10px] text-sky-700">Olahan Ikan</span>
                  </button>

                  <button type="button" onclick="quickFill('garam.majungan@gmail.com', 'H. Achmad Syafi\\'i (Petambak Garam)')" class="p-2 border border-slate-200 bg-slate-50 hover:bg-slate-100 rounded-xl text-left transition-colors">
                    <strong class="text-slate-900 block truncate">🧂 Garam Majungan</strong>
                    <span class="text-[10px] text-slate-600">Petambak</span>
                  </button>

                  <button type="button" onclick="quickFill('admin.sigara@gmail.com', 'Admin SIGARA Pamekasan')" class="p-2 border border-purple-200 bg-purple-50 hover:bg-purple-100 rounded-xl text-left transition-colors">
                    <strong class="text-purple-900 block truncate">⚙️ Admin Sistem</strong>
                    <span class="text-[10px] text-purple-700">Pengelola</span>
                  </button>

                  <button type="button" onclick="quickFill('dinas.perikanan@gmail.com', 'Dinas Perikanan Pamekasan')" class="p-2 border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 rounded-xl text-left transition-colors">
                    <strong class="text-emerald-900 block truncate">🏛️ Dinas Perikanan</strong>
                    <span class="text-[10px] text-emerald-700">Pimpinan EIS</span>
                  </button>
                </div>
              </div>

              <!-- Guest option -->
              <div class="text-center pt-1">
                <a href="/beranda?guest=true" class="text-xs text-slate-500 hover:text-sky-600 font-semibold underline">
                  Lewati dan Masuk sebagai Tamu (Mode Publik) →
                </a>
              </div>
            </div>

            <!-- Footer: QR Code for Mobile Access -->
            <div class="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
              <div>
                <p class="font-bold text-slate-800 text-[11px]">📱 Scan untuk Buka di HP:</p>
                <p class="text-[10px] text-slate-500">Arahkan kamera HP ke kode QR ini</p>
                <code class="text-[10px] font-mono text-sky-700">http://${HOST_IP}:${PORT}</code>
              </div>
              <img src="${mobileQrUrl}" alt="QR Akses HP" class="w-16 h-16 rounded-lg border border-slate-200 shadow-xs flex-shrink-0" />
            </div>
          </div>
        </div>

        <!-- Footer Notice -->
        <div class="py-4 text-center text-xs text-slate-400">
          <p>SIGARA-PAMEKASAN • Sistem Informasi Terintegrasi UMKM Olahan Laut & Garam</p>
          <p class="text-[10px] mt-0.5">Universitas Islam Madura (MKB020204) — Semester Ganjil 2026/2027</p>
        </div>

        <script>
          function quickFill(email, name) {
            document.getElementById('inputEmail').value = email;
            document.getElementById('inputName').value = name;
            performLogin(email, name);
          }

          function promptGoogleLogin() {
            const email = prompt('Masukkan Akun Gmail Pribadi Anda:', 'nama.anda@gmail.com');
            if (email && email.includes('@')) {
              const defaultName = email.split('@')[0].replace(/[._-]/g, ' ').replace(/\\b\\w/g, l => l.toUpperCase());
              const name = prompt('Masukkan Nama Lengkap Anda:', defaultName) || defaultName;
              performLogin(email, name);
            }
          }

          function handleDirectLogin(e) {
            e.preventDefault();
            const email = document.getElementById('inputEmail').value;
            const name = document.getElementById('inputName').value;
            performLogin(email, name);
          }

          async function performLogin(email, name) {
            const res = await fetch('/api/v1/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, name })
            });
            const data = await res.json();
            if (data.success) {
              window.location.href = '/beranda';
            }
          }
        </script>
      </body>
      </html>
    `;

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(html);
  }

  // =========================================================================
  // HALAMAN BERANDA (PUBLIK) — Sesuai Screenshot A
  // =========================================================================
  if (pathname === '/beranda') {
    const html = `
      <!DOCTYPE html>
      <html lang="id">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
        <title>Beranda — SIGARA-PAMEKASAN (UMKM Olahan Laut & Garam)</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
        <style>body { font-family: 'Plus Jakarta Sans', sans-serif; }</style>
      </head>
      <body class="bg-slate-50 text-slate-900 min-h-screen flex flex-col antialiased pb-16 md:pb-0">
        <!-- Top Label matching Screenshot A -->
        <div class="bg-slate-100 text-slate-600 text-xs px-4 py-1.5 border-b border-slate-200 font-semibold flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-sky-700 font-bold">A. Halaman Beranda (Publik)</span>
            <span class="text-slate-400">|</span>
            <span>SIGARA-PAMEKASAN: Sistem Informasi Garam dan UMKM Olahan Laut Pamekasan</span>
          </div>
          <div class="hidden sm:flex items-center gap-2 text-[11px] text-sky-800">
            <span>📱 Akses HP:</span>
            <code class="bg-white px-1.5 py-0.5 rounded border border-slate-200 font-mono">http://${HOST_IP}:${PORT}</code>
          </div>
        </div>

        ${getNavigationHtml('beranda', currentUser)}

        <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-6">
          <!-- Floating Search Row matching Screenshot A -->
          <div class="bg-white p-2.5 sm:p-3 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-3">
            <div class="relative flex-1 w-full">
              <svg class="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <input type="text" id="homeSearch" placeholder="Cari UMKM / produk olahan laut (ikan asin, rengginang, terasi)..." class="w-full pl-10 pr-3 py-2.5 text-xs text-slate-800 placeholder-slate-400 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500" />
            </div>

            <div class="w-full md:w-48">
              <select id="homeDistrict" class="w-full px-3 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white text-slate-700">
                <option value="all">Kecamatan ▾</option>
                <option value="Pademawu">Kec. Pademawu</option>
                <option value="Tlanakan">Kec. Tlanakan</option>
                <option value="Galis">Kec. Galis</option>
                <option value="Pasean">Kec. Pasean</option>
                <option value="Pamekasan">Kec. Pamekasan</option>
              </select>
            </div>

            <div class="w-full md:w-48">
              <select id="homeCategory" class="w-full px-3 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white text-slate-700">
                <option value="all">Kategori ▾</option>
                <option value="olahan_ikan">Produk Olahan Ikan</option>
                <option value="rengginang_ikan">Rengginang Ikan & Lorjuk</option>
                <option value="kerupuk_ikan">Kerupuk Ikan & Terung</option>
                <option value="olahan_udang">Olahan Udang (Petis)</option>
                <option value="terasi_dan_hasil_laut">Terasi & Fermentasi</option>
                <option value="petambak_garam">Petambak Garam</option>
              </select>
            </div>

            <button onclick="handleHomeSearch()" class="w-full md:w-auto px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <span>Cari</span>
            </button>
          </div>

          <!-- Hero Banner matching Screenshot A -->
          <div class="relative overflow-hidden rounded-3xl border border-sky-100 shadow-md">
            <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1600&q=80'); filter: brightness(0.92);"></div>
            <div class="absolute inset-0 bg-gradient-to-r from-sky-950/85 via-sky-900/70 to-transparent"></div>

            <div class="relative p-6 sm:p-12 lg:p-16 max-w-2xl text-white space-y-4">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-400/20 text-sky-200 border border-sky-400/30 text-xs font-semibold backdrop-blur-xs">
                🌊 Sentra Maritim & Garam Rakyat Madura
              </div>

              <h1 class="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
                Dukung UMKM dan Potensi Garam Pamekasan
              </h1>

              <p class="text-xs sm:text-sm text-sky-100 font-normal leading-relaxed max-w-xl">
                Temukan berbagai UMKM, produk unggulan (ikan asin, rengginang lorjuk, kerupuk tenggiri, terasi), dan informasi lahan garam di Kabupaten Pamekasan dalam satu platform terintegrasi.
              </p>

              <div class="flex flex-wrap items-center gap-3 pt-2">
                <a href="/peta" class="px-5 py-2.5 sm:px-6 sm:py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-sky-600/30 flex items-center gap-2 transition-all">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
                  <span>Jelajahi Peta</span>
                </a>

                <button onclick="openAddUmkmModal()" class="px-5 py-2.5 sm:px-6 sm:py-3 bg-white hover:bg-slate-50 text-sky-800 font-bold text-xs rounded-xl shadow-sm border border-slate-200 flex items-center gap-2 transition-all">
                  <svg class="w-4 h-4 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                  <span>+ Daftarkan Usaha</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Bottom Statistics Bar matching Screenshot A -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <!-- Card 1 -->
            <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3 sm:gap-4">
              <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
              </div>
              <div>
                <p class="text-[11px] sm:text-xs text-slate-500 font-medium">Jumlah UMKM</p>
                <h3 class="text-lg sm:text-2xl font-black text-slate-900 mt-0.5">${umkms.length} <span class="text-xs font-normal text-slate-400">unit</span></h3>
              </div>
            </div>

            <!-- Card 2 -->
            <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3 sm:gap-4">
              <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <div>
                <p class="text-[11px] sm:text-xs text-slate-500 font-medium">Jumlah Kecamatan</p>
                <h3 class="text-lg sm:text-2xl font-black text-slate-900 mt-0.5">13 <span class="text-xs font-normal text-slate-400">kecamatan</span></h3>
              </div>
            </div>

            <!-- Card 3 -->
            <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3 sm:gap-4">
              <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
              </div>
              <div>
                <p class="text-[11px] sm:text-xs text-slate-500 font-medium">Jumlah Produk</p>
                <h3 class="text-lg sm:text-2xl font-black text-slate-900 mt-0.5">356 <span class="text-xs font-normal text-slate-400">produk</span></h3>
              </div>
            </div>

            <!-- Card 4 -->
            <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3 sm:gap-4">
              <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15c2.5-2 5-2 7.5 0s5 2 7.5 0 2.5-2 3-2 M3 19c2.5-2 5-2 7.5 0s5 2 7.5 0 2.5-2 3-2"></path></svg>
              </div>
              <div>
                <p class="text-[11px] sm:text-xs text-slate-500 font-medium">Lahan Garam</p>
                <h3 class="text-lg sm:text-2xl font-black text-slate-900 mt-0.5">2.845 <span class="text-xs font-normal text-slate-400">hektar</span></h3>
              </div>
            </div>
          </div>

          <!-- Featured Products -->
          <div class="pt-4">
            <div class="flex justify-between items-end mb-4">
              <div>
                <h2 class="text-base sm:text-lg font-bold text-slate-900">Produk Unggulan Olahan Laut & Garam</h2>
                <p class="text-xs text-slate-500">Katalog kuliner maritim khas pesisir Kabupaten Pamekasan.</p>
              </div>
              <a href="/direktori" class="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1">
                <span>Lihat Semua</span> →
              </a>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              ${umkms.slice(0, 6).map(u => `
                <div class="bg-white p-4 rounded-2xl border border-slate-200 hover:border-sky-300 shadow-xs hover:shadow-md transition-all space-y-3">
                  <div class="flex items-start justify-between">
                    <div>
                      <span class="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${u.sector === 'garam' ? 'bg-sky-50 text-sky-700 border border-sky-200' : 'bg-orange-50 text-orange-700 border border-orange-200'} mb-1">
                        ${u.category_label}
                      </span>
                      <h4 class="font-bold text-sm text-slate-900">${u.name}</h4>
                      <p class="text-[11px] text-slate-500">${u.owner_name} • Desa ${u.village_name}, Kec. ${u.district_name}</p>
                    </div>
                    <span class="w-8 h-8 rounded-lg ${u.sector === 'garam' ? 'bg-sky-100 text-sky-600' : 'bg-orange-100 text-orange-600'} flex items-center justify-center text-sm">
                      ${u.sector === 'garam' ? '🧂' : '🐟'}
                    </span>
                  </div>

                  <div class="p-2.5 bg-slate-50 rounded-xl text-xs space-y-1">
                    <p class="text-slate-700"><strong>Produk:</strong> ${u.products}</p>
                    <p class="text-slate-500 text-[11px]">Kapasitas: <strong class="text-slate-700">${u.production_capacity}</strong></p>
                  </div>

                  <div class="flex items-center justify-between text-xs pt-1">
                    <span class="font-mono text-slate-500 text-[11px]">${u.phone}</span>
                    <a href="/peta?highlight=${u.id}" class="text-sky-600 hover:text-sky-700 font-bold flex items-center gap-1">
                      <span>Lihat di Peta</span> 📍
                    </a>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </main>

        <footer class="bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs text-slate-500">
          <p>© 2026 SIGARA-PAMEKASAN • Sistem Informasi Geografis UMKM Olahan Laut & Garam</p>
          <p class="text-[11px] text-slate-400 mt-0.5">Universitas Islam Madura (MKB020204) — Pamekasan, Jawa Timur</p>
        </footer>

        ${getAddUmkmModalHtml()}

        <script>
          function handleHomeSearch() {
            const query = document.getElementById('homeSearch').value;
            const dist = document.getElementById('homeDistrict').value;
            const cat = document.getElementById('homeCategory').value;
            window.location.href = '/peta?q=' + encodeURIComponent(query) + '&district=' + encodeURIComponent(dist) + '&category=' + encodeURIComponent(cat);
          }
        </script>
      </body>
      </html>
    `;

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(html);
  }

  // =========================================================================
  // HALAMAN PETA UTAMA — Sesuai Screenshot B
  // =========================================================================
  if (pathname === '/peta') {
    const html = `
      <!DOCTYPE html>
      <html lang="id">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
        <title>Peta Utama — SIGARA-PAMEKASAN (UMKM Olahan Laut & Garam)</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
        <style>
          body { font-family: 'Plus Jakarta Sans', sans-serif; }
          .leaflet-popup-content-wrapper { border-radius: 0.75rem; padding: 0; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.15); }
          .leaflet-popup-content { margin: 0; }
        </style>
      </head>
      <body class="bg-slate-100 text-slate-900 h-screen flex flex-col overflow-hidden antialiased pb-14 md:pb-0">
        <!-- Top Label matching Screenshot B -->
        <div class="bg-slate-100 text-slate-600 text-xs px-4 py-1.5 border-b border-slate-200 font-semibold flex items-center justify-between flex-shrink-0">
          <div class="flex items-center gap-2">
            <span class="text-sky-700 font-bold">B. Halaman Peta Utama</span>
            <span class="text-slate-400">|</span>
            <span class="hidden sm:inline">SIGARA-PAMEKASAN: Peta Spasial UMKM Olahan Laut & Garam</span>
          </div>
          <div class="flex items-center gap-3">
            <a href="/beranda" class="text-sky-600 hover:text-sky-700 text-[11px] font-bold">← Beranda</a>
          </div>
        </div>

        <!-- Top Header Bar with Search matching Screenshot B -->
        <header class="bg-white border-b border-slate-200 h-14 px-3 sm:px-4 flex items-center justify-between gap-3 flex-shrink-0 z-30 shadow-xs">
          <a href="/beranda" class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
              S
            </div>
            <div class="hidden sm:block font-extrabold text-slate-900 text-sm tracking-wide">
              SIGARA-PAMEKASAN
            </div>
          </a>

          <!-- Center search input matching Screenshot B -->
          <div class="flex-1 max-w-lg relative">
            <svg class="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input type="text" id="mapSearchInput" placeholder="Cari lokasi, produk olahan laut, atau nama UMKM..." class="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500" />
          </div>

          <div class="flex items-center gap-2">
            <!-- Mobile Toggle Controls Button -->
            <button onclick="toggleMobilePanel()" class="md:hidden px-2.5 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1">
              <span>🎛️</span>
              <span id="panelToggleText">Filter</span>
            </button>
            <button onclick="openAddUmkmModal()" class="px-2.5 sm:px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm flex-shrink-0">
              <span>+ Usaha</span>
            </button>
          </div>
        </header>

        <!-- Main Map Screen with Floating Left Sidebar matching Screenshot B -->
        <div class="flex-1 relative overflow-hidden flex">
          <!-- Left Floating Controls Panel matching Screenshot B -->
          <div id="sideControlsPanel" class="hidden md:flex absolute top-4 left-4 z-20 w-72 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-xl overflow-hidden flex-col max-h-[calc(100vh-140px)]">
            <!-- Header Panel -->
            <div class="p-3 bg-sky-900 text-white flex items-center justify-between">
              <span class="font-bold text-xs uppercase tracking-wider">Kontrol Peta Spasial</span>
              <button onclick="toggleMobilePanel()" class="md:hidden text-sky-200 hover:text-white font-bold text-xs">✕ Tutup</button>
            </div>

            <div class="p-4 space-y-4 overflow-y-auto text-xs">
              <!-- SECTION 1: Layer matching Screenshot B -->
              <div class="space-y-2 border-b border-slate-100 pb-3">
                <div class="flex justify-between items-center text-slate-800 font-bold text-xs uppercase tracking-wider">
                  <span>Layer</span>
                  <span class="text-slate-400 text-[10px]">▲</span>
                </div>
                <div class="space-y-1.5 text-slate-700">
                  <label class="flex items-center gap-2 cursor-pointer hover:text-sky-700">
                    <input type="checkbox" id="layerUmkm" checked class="rounded border-slate-300 text-sky-600 focus:ring-sky-500" />
                    <span class="font-medium">UMKM (${umkms.length} Titik)</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer hover:text-sky-700">
                    <input type="checkbox" id="layerTambak" checked class="rounded border-slate-300 text-sky-600 focus:ring-sky-500" />
                    <span class="font-medium">Tambak (${saltPonds.length} Poligon)</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer hover:text-sky-700">
                    <input type="checkbox" id="layerTpi" checked class="rounded border-slate-300 text-sky-600 focus:ring-sky-500" />
                    <span class="font-medium">TPI (Tempat Pelelangan Ikan)</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer hover:text-sky-700">
                    <input type="checkbox" id="layerBatas" checked class="rounded border-slate-300 text-sky-600 focus:ring-sky-500" />
                    <span class="font-medium">Batas Administrasi Pamekasan</span>
                  </label>
                </div>
              </div>

              <!-- SECTION 2: Filter matching Screenshot B -->
              <div class="space-y-2.5 border-b border-slate-100 pb-3">
                <div class="flex justify-between items-center text-slate-800 font-bold text-xs uppercase tracking-wider">
                  <span>Filter</span>
                  <span class="text-slate-400 text-[10px]">▲</span>
                </div>

                <div>
                  <label class="block text-slate-500 text-[11px] font-medium mb-1">Kecamatan:</label>
                  <select id="filterDistrict" class="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white text-xs text-slate-700 focus:ring-1 focus:ring-sky-500 outline-none">
                    <option value="all">Semua Kecamatan</option>
                    <option value="Pademawu">Kecamatan Pademawu</option>
                    <option value="Tlanakan">Kecamatan Tlanakan</option>
                    <option value="Galis">Kecamatan Galis</option>
                    <option value="Pasean">Kecamatan Pasean</option>
                    <option value="Pamekasan">Kecamatan Pamekasan</option>
                  </select>
                </div>

                <div>
                  <label class="block text-slate-500 text-[11px] font-medium mb-1">Kategori:</label>
                  <select id="filterCategory" class="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white text-xs text-slate-700 focus:ring-1 focus:ring-sky-500 outline-none">
                    <option value="all">Semua Kategori</option>
                    <option value="olahan_ikan">Produk Olahan Ikan</option>
                    <option value="rengginang_ikan">Rengginang Ikan & Lorjuk</option>
                    <option value="kerupuk_ikan">Kerupuk Ikan & Terung</option>
                    <option value="olahan_udang">Olahan Udang (Petis)</option>
                    <option value="terasi_dan_hasil_laut">Terasi & Fermentasi</option>
                    <option value="petambak_garam">Petambak Garam Rakyat</option>
                    <option value="pengolahan_garam">Pengolahan Garam</option>
                    <option value="garam_konsumsi">Garam Konsumsi</option>
                  </select>
                </div>

                <div>
                  <label class="block text-slate-500 text-[11px] font-medium mb-1">Skala Usaha:</label>
                  <select id="filterScale" class="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white text-xs text-slate-700 focus:ring-1 focus:ring-sky-500 outline-none">
                    <option value="all">Semua Skala Usaha</option>
                    <option value="Mikro">Usaha Mikro</option>
                    <option value="Kecil">Usaha Kecil</option>
                    <option value="Menengah">Usaha Menengah</option>
                  </select>
                </div>
              </div>

              <!-- SECTION 3: Alat matching Screenshot B -->
              <div class="space-y-2">
                <div class="flex justify-between items-center text-slate-800 font-bold text-xs uppercase tracking-wider">
                  <span>Alat</span>
                  <span class="text-slate-400 text-[10px]">▲</span>
                </div>
                <button onclick="toggleBufferTool()" id="bufferBtn" class="w-full py-2 px-3 border border-slate-300 hover:border-sky-500 rounded-xl bg-slate-50 hover:bg-sky-50 text-slate-700 hover:text-sky-800 font-semibold flex items-center justify-center gap-2 transition-all">
                  <span>🎯 Buffer / Ukur Radius Pesisir</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Leaflet Map Canvas -->
          <div id="mainMap" class="w-full h-full z-0"></div>

          <!-- Floating Map Tools Bottom Right matching Screenshot B -->
          <div class="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200 shadow-xl text-xs">
            <button onclick="resetZoom()" class="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold">
              + −
            </button>
            <button onclick="zoomToUserLocation()" class="px-2.5 py-1.5 hover:bg-sky-50 text-slate-700 hover:text-sky-700 rounded-xl font-semibold flex items-center gap-1">
              <span>📍 Lokasi</span>
            </button>
            <button onclick="toggleLegenda()" class="px-2.5 py-1.5 hover:bg-sky-50 text-slate-700 hover:text-sky-700 rounded-xl font-semibold flex items-center gap-1">
              <span>📑 Legenda</span>
            </button>
          </div>

          <!-- Compass on Top Right matching Screenshot B -->
          <div class="absolute top-4 right-4 z-20 w-9 h-9 bg-white/95 backdrop-blur-md rounded-full border border-slate-200 shadow-md flex items-center justify-center text-sky-700 font-black text-xs">
            ▲ N
          </div>

          <!-- Legenda Card -->
          <div id="legendaModal" class="absolute bottom-16 right-4 z-20 hidden bg-white p-4 rounded-2xl border border-slate-200 shadow-xl w-60 text-xs space-y-2">
            <div class="flex justify-between items-center font-bold text-slate-800 pb-1 border-b border-slate-100">
              <span>Legenda Peta SIGARA</span>
              <button onclick="toggleLegenda()" class="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3.5 h-3.5 rounded-full bg-red-600 border border-white shadow-xs"></span>
              <span class="text-slate-700">Titik UMKM Olahan Laut & Garam</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-4 h-3 rounded bg-sky-400/50 border border-sky-600"></span>
              <span class="text-slate-700">Hamparan Tambak Garam (Polygon)</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-4 h-4 rounded bg-purple-600 text-white flex items-center justify-center text-[10px]">⚓</span>
              <span class="text-slate-700">TPI / Tempat Pelelangan Ikan</span>
            </div>
          </div>
        </div>

        ${getAddUmkmModalHtml()}

        <!-- Detail UMKM Modal -->
        <div id="detailUmkmModal" class="fixed inset-0 z-50 hidden bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div class="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <span id="dtlCategoryBadge" class="text-[9px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 uppercase">Kategori</span>
                <h3 id="dtlName" class="font-extrabold text-base text-slate-900 mt-1">Nama Usaha</h3>
                <p id="dtlOwner" class="text-xs text-slate-500">Pemilik Usaha</p>
              </div>
              <button onclick="closeDetailModal()" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg">✕</button>
            </div>

            <div class="text-xs space-y-2 text-slate-700">
              <p><strong>Produk Unggulan:</strong> <span id="dtlProducts">...</span></p>
              <p><strong>Alamat:</strong> <span id="dtlAddress">...</span></p>
              <p><strong>Wilayah:</strong> <span id="dtlLocation">...</span></p>
              <p><strong>Kontak Telepon:</strong> <span id="dtlPhone" class="font-mono text-sky-700 font-bold">...</span></p>
              <p><strong>Kapasitas:</strong> <span id="dtlCapacity">...</span></p>
              <p><strong>Keterangan:</strong> <span id="dtlNotes" class="text-slate-500 italic">...</span></p>
            </div>

            <div class="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <a id="dtlRouteBtn" href="#" target="_blank" class="px-4 py-2 border border-slate-300 hover:bg-slate-50 rounded-xl text-slate-700 text-xs font-semibold">
                ↗ Buka Rute Maps
              </a>
              <button onclick="closeDetailModal()" class="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold">
                Tutup
              </button>
            </div>
          </div>
        </div>

        <script>
          const rawUmkms = ${JSON.stringify(umkms)};
          const rawPonds = ${JSON.stringify(saltPonds)};
          const rawTpis = ${JSON.stringify(tpiLocations)};

          let map, umkmLayerGroup, pondLayerGroup, tpiLayerGroup, bufferLayerGroup;

          document.addEventListener('DOMContentLoaded', () => {
            map = L.map('mainMap', { zoomControl: false }).setView([-7.1700, 113.5100], 11);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; OpenStreetMap | SIGARA-PAMEKASAN'
            }).addTo(map);

            umkmLayerGroup = L.layerGroup().addTo(map);
            pondLayerGroup = L.layerGroup().addTo(map);
            tpiLayerGroup = L.layerGroup().addTo(map);
            bufferLayerGroup = L.layerGroup().addTo(map);

            renderAllLayers();

            document.getElementById('layerUmkm').addEventListener('change', (e) => {
              if (e.target.checked) map.addLayer(umkmLayerGroup); else map.removeLayer(umkmLayerGroup);
            });
            document.getElementById('layerTambak').addEventListener('change', (e) => {
              if (e.target.checked) map.addLayer(pondLayerGroup); else map.removeLayer(pondLayerGroup);
            });
            document.getElementById('layerTpi').addEventListener('change', (e) => {
              if (e.target.checked) map.addLayer(tpiLayerGroup); else map.removeLayer(tpiLayerGroup);
            });

            document.getElementById('mapSearchInput').addEventListener('input', applyFilters);
            document.getElementById('filterDistrict').addEventListener('change', applyFilters);
            document.getElementById('filterCategory').addEventListener('change', applyFilters);
            document.getElementById('filterScale').addEventListener('change', applyFilters);

            const urlParams = new URLSearchParams(window.location.search);
            const hlId = urlParams.get('highlight');
            if (hlId) {
              const target = rawUmkms.find(u => u.id == hlId);
              if (target) {
                map.setView([target.latitude, target.longitude], 14);
              }
            }
          });

          function toggleMobilePanel() {
            const panel = document.getElementById('sideControlsPanel');
            panel.classList.toggle('hidden');
            panel.classList.toggle('flex');
          }

          function renderAllLayers(filteredUmkms = rawUmkms, filteredPonds = rawPonds) {
            umkmLayerGroup.clearLayers();
            pondLayerGroup.clearLayers();
            tpiLayerGroup.clearLayers();

            filteredPonds.forEach(p => {
              const latLngs = p.coordinates[0].map(c => [c[1], c[0]]);
              const poly = L.polygon(latLngs, {
                color: '#0284c7',
                weight: 2,
                fillColor: '#38bdf8',
                fillOpacity: 0.35
              });
              poly.bindPopup(\`
                <div class="p-3 text-xs min-w-[220px]">
                  <span class="px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-bold text-[9px]">LAHAN TAMBAK GARAM</span>
                  <h4 class="font-bold text-sm text-slate-900 mt-1">\${p.umkm_name}</h4>
                  <p class="text-slate-600 mt-1">Kode: <strong>\${p.code}</strong></p>
                  <p class="text-slate-600">Luas: <strong>\${(p.area_sqm/10000).toFixed(2)} Hektar</strong></p>
                  <p class="text-slate-600">Wilayah: Desa \${p.village_name}, Kec. \${p.district_name}</p>
                </div>
              \`);
              pondLayerGroup.addLayer(poly);
            });

            rawTpis.forEach(t => {
              const tpiIcon = L.divIcon({
                className: 'custom-tpi-marker',
                html: \`<div class="w-7 h-7 rounded-full bg-purple-600 border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold">⚓</div>\`,
                iconSize: [28, 28],
                iconAnchor: [14, 14]
              });
              const tpiMarker = L.marker([t.latitude, t.longitude], { icon: tpiIcon });
              tpiMarker.bindPopup(\`
                <div class="p-3 text-xs min-w-[220px]">
                  <span class="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold text-[9px]">TPI / PELABUHAN IKAN</span>
                  <h4 class="font-bold text-sm text-slate-900 mt-1">\${t.name}</h4>
                  <p class="text-slate-600 mt-1">Kapasitas: \${t.capacity}</p>
                  <p class="text-slate-600">Kecamatan: \${t.district_name}</p>
                </div>
              \`);
              tpiLayerGroup.addLayer(tpiMarker);
            });

            filteredUmkms.forEach(u => {
              const markerIcon = L.divIcon({
                className: 'custom-umkm-marker',
                html: \`<div class="w-6 h-6 rounded-full bg-red-600 border-2 border-white shadow-md flex items-center justify-center text-white text-[11px] font-bold transform hover:scale-125 transition-transform">📍</div>\`,
                iconSize: [24, 24],
                iconAnchor: [12, 12],
                popupAnchor: [0, -12]
              });

              const marker = L.marker([u.latitude, u.longitude], { icon: markerIcon });

              // POPUP MATCHING EXACT SCREENSHOT B
              const popupHtml = \`
                <div class="p-3 font-sans min-w-[260px] max-w-xs">
                  <div class="flex items-start gap-2.5 mb-2">
                    <div class="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center text-lg flex-shrink-0">
                      🏪
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center justify-between">
                        <h4 class="font-bold text-slate-900 text-sm leading-tight">\${u.name}</h4>
                        <button onclick="map.closePopup()" class="text-slate-400 hover:text-slate-600 text-xs ml-1">✕</button>
                      </div>
                      <div class="text-[11px] text-slate-600 mt-1.5 space-y-0.5">
                        <div class="flex"><span class="w-16 text-slate-400">Kategori</span> <span class="font-medium">: \${u.category_label}</span></div>
                        <div class="flex"><span class="w-16 text-slate-400">Produk</span> <span class="font-medium text-slate-800">: \${u.products}</span></div>
                        <div class="flex"><span class="w-16 text-slate-400">Kontak</span> <span class="font-medium font-mono">: \${u.phone}</span></div>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center gap-2 mt-3 pt-2.5 border-t border-slate-100">
                    <button onclick="showDetailModal(\${u.id})" class="flex-1 py-1.5 px-3 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 shadow-xs transition-colors">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      <span>Detail</span>
                    </button>
                    <a href="https://www.google.com/maps/dir/?api=1&destination=\${u.latitude},\${u.longitude}" target="_blank" class="flex-1 py-1.5 px-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                      <span>Rute</span>
                    </a>
                  </div>
                </div>
              \`;

              marker.bindPopup(popupHtml, { closeButton: false });
              umkmLayerGroup.addLayer(marker);
            });
          }

          function applyFilters() {
            const q = document.getElementById('mapSearchInput').value.toLowerCase();
            const district = document.getElementById('filterDistrict').value;
            const category = document.getElementById('filterCategory').value;
            const scale = document.getElementById('filterScale').value;

            const filtered = rawUmkms.filter(u => {
              const matchQ = u.name.toLowerCase().includes(q) || u.products.toLowerCase().includes(q) || u.owner_name.toLowerCase().includes(q);
              const matchD = district === 'all' || u.district_name === district;
              const matchC = category === 'all' || u.category === category;
              const matchS = scale === 'all' || (u.scale && u.scale === scale);
              return matchQ && matchD && matchC && matchS;
            });

            const filteredPonds = rawPonds.filter(p => {
              return district === 'all' || p.district_name === district;
            });

            renderAllLayers(filtered, filteredPonds);
          }

          function showDetailModal(id) {
            const u = rawUmkms.find(item => item.id == id);
            if (!u) return;

            document.getElementById('dtlName').innerText = u.name;
            document.getElementById('dtlOwner').innerText = 'Pemilik: ' + u.owner_name;
            document.getElementById('dtlCategoryBadge').innerText = u.category_label;
            document.getElementById('dtlProducts').innerText = u.products;
            document.getElementById('dtlAddress').innerText = u.address;
            document.getElementById('dtlLocation').innerText = 'Desa ' + u.village_name + ', Kec. ' + u.district_name + ', Kab. Pamekasan';
            document.getElementById('dtlPhone').innerText = u.phone;
            document.getElementById('dtlCapacity').innerText = u.production_capacity;
            document.getElementById('dtlNotes').innerText = u.notes || 'UMKM terverifikasi SIGARA.';
            document.getElementById('dtlRouteBtn').href = 'https://www.google.com/maps/dir/?api=1&destination=' + u.latitude + ',' + u.longitude;

            document.getElementById('detailUmkmModal').classList.remove('hidden');
          }

          function closeDetailModal() {
            document.getElementById('detailUmkmModal').classList.add('hidden');
          }

          function resetZoom() {
            map.setView([-7.1700, 113.5100], 11);
          }

          function zoomToUserLocation() {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(pos => {
                map.setView([pos.coords.latitude, pos.coords.longitude], 14);
                L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map).bindPopup('Lokasi Anda Sekarang').openPopup();
              }, () => alert('Tidak dapat mendeteksi lokasi browser.'));
            }
          }

          function toggleLegenda() {
            document.getElementById('legendaModal').classList.toggle('hidden');
          }

          let isBufferActive = false;
          function toggleBufferTool() {
            isBufferActive = !isBufferActive;
            bufferLayerGroup.clearLayers();
            const btn = document.getElementById('bufferBtn');
            if (isBufferActive) {
              btn.classList.add('bg-sky-600', 'text-white');
              alert('Mode Buffer Aktif: Klik pada titik mana saja di peta untuk melihat radius zona pesisir (3 km).');
              map.once('click', (e) => {
                L.circle(e.latlng, {
                  radius: 3000,
                  color: '#0284c7',
                  fillColor: '#38bdf8',
                  fillOpacity: 0.2
                }).addTo(bufferLayerGroup).bindPopup('Radius Buffer Maritim: 3.000 Meter (3 Km)').openPopup();
                btn.classList.remove('bg-sky-600', 'text-white');
                isBufferActive = false;
              });
            } else {
              btn.classList.remove('bg-sky-600', 'text-white');
            }
          }
        </script>
      </body>
      </html>
    `;

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(html);
  }

  // =========================================================================
  // HALAMAN DIREKTORI UMKM
  // =========================================================================
  if (pathname === '/direktori') {
    const tableRows = umkms.map((u, i) => `
      <tr class="hover:bg-slate-50 transition-colors border-b border-slate-100 text-xs">
        <td class="py-3 px-4 text-slate-400 font-mono">${i + 1}</td>
        <td class="py-3 px-4">
          <div class="font-bold text-slate-900">${u.name}</div>
          <div class="text-[10px] text-slate-400 font-mono">${u.code}</div>
        </td>
        <td class="py-3 px-4 text-slate-700 font-medium">${u.owner_name}</td>
        <td class="py-3 px-4">
          <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold border ${u.sector === 'garam' ? 'bg-sky-50 text-sky-700 border-sky-200' : 'bg-orange-50 text-orange-700 border-orange-200'}">
            ${u.category_label}
          </span>
        </td>
        <td class="py-3 px-4 text-slate-800 font-medium max-w-xs truncate">${u.products}</td>
        <td class="py-3 px-4 text-slate-600">
          <div>Kec. ${u.district_name}</div>
          <div class="text-[10px] text-slate-400">Desa ${u.village_name}</div>
        </td>
        <td class="py-3 px-4 font-mono text-slate-600">${u.phone}</td>
        <td class="py-3 px-4 text-right">
          <a href="/peta?highlight=${u.id}" class="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-lg font-semibold border border-sky-200">
            <span>Peta</span> 📍
          </a>
        </td>
      </tr>
    `).join('');

    const html = `
      <!DOCTYPE html>
      <html lang="id">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
        <title>Direktori UMKM — SIGARA-PAMEKASAN</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
        <style>body { font-family: 'Plus Jakarta Sans', sans-serif; }</style>
      </head>
      <body class="bg-slate-50 text-slate-900 min-h-screen flex flex-col antialiased pb-16 md:pb-0">
        ${getNavigationHtml('direktori', currentUser)}

        <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-5">
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 class="text-xl font-black text-slate-900">Direktori Lengkap UMKM Olahan Laut & Garam</h1>
              <p class="text-xs text-slate-500 mt-1">Daftar pelaku usaha, komoditas ikan/udang/garam, dan lokasi di Kabupaten Pamekasan.</p>
            </div>
            <button onclick="openAddUmkmModal()" class="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2">
              <span>+ Daftarkan Usaha Baru</span>
            </button>
          </div>

          <div class="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                    <th class="py-3 px-4">No</th>
                    <th class="py-3 px-4">Nama Usaha</th>
                    <th class="py-3 px-4">Pemilik</th>
                    <th class="py-3 px-4">Kategori</th>
                    <th class="py-3 px-4">Produk Unggulan</th>
                    <th class="py-3 px-4">Wilayah</th>
                    <th class="py-3 px-4">Kontak</th>
                    <th class="py-3 px-4 text-right">Lokasi</th>
                  </tr>
                </thead>
                <tbody>
                  ${tableRows}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        ${getAddUmkmModalHtml()}
      </body>
      </html>
    `;

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(html);
  }

  // =========================================================================
  // HALAMAN STATISTIK & EIS
  // =========================================================================
  if (pathname === '/statistik') {
    const totalUmkm = umkms.length;
    const totalGaram = umkms.filter(u => u.sector === 'garam').length;
    const totalOlahan = umkms.filter(u => u.sector === 'olahan_laut').length;

    const html = `
      <!DOCTYPE html>
      <html lang="id">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
        <title>Statistik & EIS — SIGARA-PAMEKASAN</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
        <style>body { font-family: 'Plus Jakarta Sans', sans-serif; }</style>
      </head>
      <body class="bg-slate-50 text-slate-900 min-h-screen flex flex-col antialiased pb-16 md:pb-0">
        ${getNavigationHtml('statistik', currentUser)}

        <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-5">
          <div class="bg-gradient-to-r from-sky-900 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-md">
            <span class="text-xs uppercase tracking-widest text-sky-300 font-bold">Executive Information System</span>
            <h1 class="text-2xl sm:text-3xl font-black mt-1">Statistik Persebaran UMKM Olahan Laut & Garam</h1>
            <p class="text-xs sm:text-sm text-sky-100 mt-2 max-w-2xl">
              Data analitik terpadu untuk monitoring produktivitas nelayan, tambak garam pesisir, dan UMKM olahan laut Kabupaten Pamekasan.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <p class="text-xs text-slate-500 font-medium">Total UMKM Terdata</p>
              <h3 class="text-3xl font-black text-slate-900 mt-1">${totalUmkm}</h3>
              <p class="text-[11px] text-sky-600 font-semibold mt-1">Unit Usaha Terdaftar</p>
            </div>
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <p class="text-xs text-slate-500 font-medium">UMKM Olahan Laut</p>
              <h3 class="text-3xl font-black text-orange-600 mt-1">${totalOlahan}</h3>
              <p class="text-[11px] text-orange-600 font-semibold mt-1">Ikan Asin, Rengginang, Terasi, Petis</p>
            </div>
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <p class="text-xs text-slate-500 font-medium">UMKM & Tambak Garam</p>
              <h3 class="text-3xl font-black text-sky-600 mt-1">${totalGaram}</h3>
              <p class="text-[11px] text-sky-600 font-semibold mt-1">Kristalisasi & Pengolahan</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div class="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
              <h3 class="font-bold text-sm text-slate-800 mb-1">Komposisi Sektor Usaha</h3>
              <p class="text-xs text-slate-500 mb-4">Perbandingan UMKM Olahan Laut vs Garam Rakyat.</p>
              <div class="h-64 flex items-center justify-center">
                <canvas id="pieChart"></canvas>
              </div>
            </div>

            <div class="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
              <h3 class="font-bold text-sm text-slate-800 mb-1">Persebaran per Kecamatan</h3>
              <p class="text-xs text-slate-500 mb-4">Jumlah unit usaha pada sentra pesisir utama.</p>
              <div class="h-64">
                <canvas id="barChart"></canvas>
              </div>
            </div>
          </div>
        </main>

        ${getAddUmkmModalHtml()}

        <script>
          document.addEventListener('DOMContentLoaded', () => {
            new Chart(document.getElementById('pieChart'), {
              type: 'doughnut',
              data: {
                labels: ['Olahan Laut (Ikan, Udang, Terasi)', 'Sektor Garam Rakyat'],
                datasets: [{
                  data: [${totalOlahan}, ${totalGaram}],
                  backgroundColor: ['#ea580c', '#0284c7']
                }]
              },
              options: { responsive: true, maintainAspectRatio: false }
            });

            new Chart(document.getElementById('barChart'), {
              type: 'bar',
              data: {
                labels: ['Pademawu', 'Tlanakan', 'Galis', 'Pasean'],
                datasets: [{
                  label: 'Jumlah UMKM',
                  data: [5, 4, 3, 1],
                  backgroundColor: '#0284c7',
                  borderRadius: 6
                }]
              },
              options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }
            });
          });
        </script>
      </body>
      </html>
    `;

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(html);
  }

  // Fallback: If logged in go to /beranda, otherwise /login
  if (currentUser) {
    res.writeHead(302, { Location: '/beranda' });
  } else {
    res.writeHead(302, { Location: '/login' });
  }
  res.end();
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`================================================================`);
  console.log(`   SIGARA-PAMEKASAN: UMKM OLAHAN LAUT & GARAM`);
  console.log(`   Akses Komputer/Laptop : http://localhost:${PORT}`);
  console.log(`   Akses Smartphone (HP) : http://${HOST_IP}:${PORT}`);
  console.log(`================================================================`);
});
