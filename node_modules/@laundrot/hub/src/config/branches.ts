import type { Branch } from '@laundrot/shared-types';

export const BRANCHES: Branch[] = [
  {
    id_cabang: 'CBG-001',
    nama_cabang: 'Cabang Jakarta Selatan',
    alamat: 'Jl. Kemang Raya No. 10, Jakarta Selatan',
    latitude: -6.2615,
    longitude: 106.8106,
    kuota_harian: 30,
    kuota_terpakai: 0,
    is_active: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    id_cabang: 'CBG-002',
    nama_cabang: 'Cabang Jakarta Barat',
    alamat: 'Jl. Puri Indah No. 5, Jakarta Barat',
    latitude: -6.1883,
    longitude: 106.7431,
    kuota_harian: 30,
    kuota_terpakai: 0,
    is_active: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    id_cabang: 'CBG-003',
    nama_cabang: 'Cabang Jakarta Timur',
    alamat: 'Jl. Rawamangun No. 22, Jakarta Timur',
    latitude: -6.1903,
    longitude: 106.8872,
    kuota_harian: 30,
    kuota_terpakai: 0,
    is_active: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    id_cabang: 'CBG-004',
    nama_cabang: 'Cabang Depok',
    alamat: 'Jl. Margonda Raya No. 88, Depok',
    latitude: -6.3894,
    longitude: 106.8302,
    kuota_harian: 30,
    kuota_terpakai: 0,
    is_active: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    id_cabang: 'CBG-005',
    nama_cabang: 'Cabang Tangerang',
    alamat: 'Jl. BSD Raya No. 15, Tangerang',
    latitude: -6.3014,
    longitude: 106.6527,
    kuota_harian: 30,
    kuota_terpakai: 0,
    is_active: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
];

export function getActiveBranches(): Branch[] {
  return BRANCHES.filter((b) => b.is_active);
}

export function getBranchById(id_cabang: string): Branch | undefined {
  return BRANCHES.find((b) => b.id_cabang === id_cabang);
}
