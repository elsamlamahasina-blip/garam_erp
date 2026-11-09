export type RoleType = 'admin' | 'umkm' | 'pimpinan';

export interface User {
  id: number;
  name: string;
  email: string;
  role: RoleType;
  umkm_id?: number | null;
  phone?: string;
  created_at?: string;
}

export type UmkmCategory = 
  | 'petambak_garam'
  | 'pengolahan_garam'
  | 'garam_konsumsi'
  | 'rengginang_ikan'
  | 'kerupuk_ikan'
  | 'olahan_ikan'
  | 'olahan_udang'
  | 'terasi_dan_hasil_laut';

export interface Umkm {
  id: number;
  code: string;
  name: string;
  owner_name: string;
  category: UmkmCategory;
  category_label: string;
  sector: 'garam' | 'olahan_laut';
  address: string;
  district_name: string;
  village_name: string;
  phone: string;
  latitude: number;
  longitude: number;
  established_year: number;
  production_capacity: string;
  employee_count: number;
  status: 'aktif' | 'musiman' | 'nonaktif';
  is_demo: boolean;
  notes?: string;
}

export interface SaltPond {
  id: number;
  umkm_id: number;
  umkm_name: string;
  code: string;
  area_sqm: number;
  district_name: string;
  village_name: string;
  production_season: string;
  coordinates: number[][][]; // GeoJSON Polygon coordinates [lng, lat]
  is_demo: boolean;
}

export interface GeoJsonFeature<G = any, P = any> {
  type: 'Feature';
  geometry: G;
  properties: P;
}

export interface GeoJsonFeatureCollection<G = any, P = any> {
  type: 'FeatureCollection';
  features: GeoJsonFeature<G, P>[];
}

export interface District {
  id: number;
  name: string;
  code: string;
  villages?: Village[];
}

export interface Village {
  id: number;
  district_id: number;
  name: string;
  code: string;
  is_coastal: boolean;
}

export interface EisKpiStats {
  total_umkm: number;
  total_umkm_garam: number;
  total_umkm_olahan_laut: number;
  total_salt_harvest_ton: number;
  total_seafood_output_ton: number;
  total_revenue_idr: number;
  districts_summary: {
    district_name: string;
    umkm_count: number;
    salt_ponds_area_ha: number;
  }[];
}

