<script setup lang="ts">
import { ref } from 'vue';
import { Head, useForm } from '@inertiajs/vue3';
import { Shield, KeyRound, Mail, UserCheck, ArrowRight, AlertCircle } from 'lucide-vue-next';

const form = useForm({
  email: 'admin@madura-erp.id',
  password: 'Password123!',
  remember: true,
});

const demoAccounts = [
  {
    role: 'Admin Sistem',
    email: 'admin@madura-erp.id',
    password: 'Password123!',
    desc: 'Akses penuh master data, audit, dan konfigurasi wilayah Pamekasan.',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-200'
  },
  {
    role: 'Pelaku UMKM Garam',
    email: 'garam@majungan.id',
    password: 'Password123!',
    desc: 'Operasional tambak garam Majungan, panen, dan stok bahan mentah.',
    badgeClass: 'bg-sky-100 text-sky-800 border-sky-200'
  },
  {
    role: 'Pelaku UMKM Rengginang Ikan',
    email: 'rengginang@branta.id',
    password: 'Password123!',
    desc: 'Operasional resep/BOM olahan laut, produksi batch, HPP & penjualan.',
    badgeClass: 'bg-orange-100 text-orange-800 border-orange-200'
  },
  {
    role: 'Pimpinan / Eksekutif',
    email: 'pimpinan@pamekasan.go.id',
    password: 'Password123!',
    desc: 'Dashboard analitik EIS, pemantauan spasial Pamekasan & ringkasan hasil.',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200'
  }
];

function selectDemoAccount(acc: typeof demoAccounts[0]) {
  form.email = acc.email;
  form.password = acc.password;
}

function submit() {
  form.post('/login', {
    onFinish: () => form.reset('password'),
  });
}
</script>

<template>
  <div class="min-h-screen bg-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 antialiased">
    <Head title="Masuk ke Sistem" />

    <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
      <div class="w-12 h-12 rounded-2xl bg-emerald-600 mx-auto flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-emerald-600/30">
        M
      </div>
      <h2 class="mt-4 text-2xl font-black text-slate-900 tracking-tight">
        MADURA ERP/EIS
      </h2>
      <p class="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
        Sistem Informasi Terintegrasi UMKM Garam dan Olahan Laut Kabupaten Pamekasan
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-xl px-4">
      <div class="bg-white py-8 px-6 shadow-sm border border-slate-200 sm:rounded-2xl sm:px-10 space-y-6">
        <!-- Error Alert if any -->
        <div v-if="form.errors.email || form.errors.password" class="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
          <AlertCircle class="w-4 h-4 flex-shrink-0" />
          <span>{{ form.errors.email || form.errors.password }}</span>
        </div>

        <!-- Quick Demo Account Selector -->
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Pilih Akun Demo untuk Pengujian Cepat (Pekan 1):
          </label>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              v-for="acc in demoAccounts"
              :key="acc.email"
              type="button"
              @click="selectDemoAccount(acc)"
              :class="[
                form.email === acc.email ? 'border-emerald-500 bg-emerald-50/50 ring-1 ring-emerald-500' : 'border-slate-200 hover:bg-slate-50',
                'p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between'
              ]"
            >
              <div>
                <span :class="['text-[9px] font-bold px-1.5 py-0.5 rounded border inline-block mb-1', acc.badgeClass]">
                  {{ acc.role }}
                </span>
                <p class="text-xs font-bold text-slate-800">{{ acc.email }}</p>
              </div>
              <p class="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{{ acc.desc }}</p>
            </button>
          </div>
        </div>

        <div class="relative my-4">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-slate-200"></div>
          </div>
          <div class="relative flex justify-center text-xs uppercase">
            <span class="bg-white px-3 text-slate-400 font-semibold text-[10px]">Form Kredensial</span>
          </div>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="submit" class="space-y-4 text-xs">
          <div>
            <label class="block font-semibold text-slate-700 mb-1">Alamat Email</label>
            <div class="relative">
              <Mail class="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                v-model="form.email"
                type="email"
                required
                class="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                placeholder="nama@madura-erp.id"
              />
            </div>
          </div>

          <div>
            <label class="block font-semibold text-slate-700 mb-1">Kata Sandi</label>
            <div class="relative">
              <KeyRound class="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                v-model="form.password"
                type="password"
                required
                class="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div class="flex items-center justify-between text-xs pt-1">
            <label class="flex items-center gap-2 cursor-pointer text-slate-600">
              <input
                v-model="form.remember"
                type="checkbox"
                class="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span>Ingat saya di perangkat ini</span>
            </label>
            <span class="text-slate-400 text-[11px]">Sandi Default: <code class="bg-slate-100 px-1 py-0.5 rounded font-mono">Password123!</code></span>
          </div>

          <button
            type="submit"
            :disabled="form.processing"
            class="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>Masuk ke Dashboard</span>
            <ArrowRight class="w-4 h-4" />
          </button>
        </form>
      </div>

      <!-- Footer Info -->
      <div class="mt-6 text-center text-xs text-slate-400 space-y-1">
        <p>Proyek PjBL 16 Pekan — Universitas Islam Madura (2026/2027)</p>
        <p class="text-[11px]">Sistem Pengujian & Penjaminan Mutu Perangkat Lunak Terintegrasi ISO 29119</p>
      </div>
    </div>
  </div>
</template>

