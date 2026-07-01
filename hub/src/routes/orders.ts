import { Router, type Request, type Response } from 'express';
import { findNearestBranch } from '../services/georouting.js';
import { checkQuota, generateDelayMessage, getNextBusinessDay } from '../services/quota.js';

const router = Router();

interface AllocateOrderBody {
  alamat_pelanggan: string;
  koordinat: {
    latitude: number;
    longitude: number;
  };
  id_pelanggan?: string;
  catatan?: string;
}

interface AllocateSuccessResponse {
  success: true;
  status: 'Dialokasikan';
  id_cabang: string;
  nama_cabang: string;
  distance_km: number;
  sisa_kuota: number;
  message: string;
}

interface QuotaFullResponse {
  success: false;
  status: 'Kuota Penuh';
  id_cabang: string;
  nama_cabang: string;
  kuota_harian: number;
  kuota_terpakai: number;
  reschedule_date: string;
  whatsapp_template: string;
}

type AllocateResponse = AllocateSuccessResponse | QuotaFullResponse;

router.post('/allocate', (req: Request<{}, AllocateResponse, AllocateOrderBody>, res: Response<AllocateResponse>) => {
  const { alamat_pelanggan, koordinat } = req.body;

  if (!koordinat || typeof koordinat.latitude !== 'number' || typeof koordinat.longitude !== 'number') {
    res.status(400).json({
      success: false,
      status: 'Kuota Penuh',
      id_cabang: '',
      nama_cabang: '',
      kuota_harian: 0,
      kuota_terpakai: 0,
      reschedule_date: '',
      whatsapp_template: 'Error: Koordinat pelanggan tidak valid.',
    });
    return;
  }

  const nearest = findNearestBranch(koordinat);

  if (!nearest) {
    res.status(503).json({
      success: false,
      status: 'Kuota Penuh',
      id_cabang: '',
      nama_cabang: '',
      kuota_harian: 0,
      kuota_terpakai: 0,
      reschedule_date: '',
      whatsapp_template: 'Error: Tidak ada cabang aktif yang tersedia.',
    });
    return;
  }

  const quota = checkQuota(nearest.branch.id_cabang);

  if (!quota) {
    res.status(500).json({
      success: false,
      status: 'Kuota Penuh',
      id_cabang: nearest.branch.id_cabang,
      nama_cabang: nearest.branch.nama_cabang,
      kuota_harian: 0,
      kuota_terpakai: 0,
      reschedule_date: '',
      whatsapp_template: 'Error: Data cabang tidak ditemukan.',
    });
    return;
  }

  if (!quota.available) {
    const rescheduleDate = getNextBusinessDay();
    const whatsappTemplate = generateDelayMessage(nearest.branch, rescheduleDate);

    res.status(200).json({
      success: false,
      status: 'Kuota Penuh',
      id_cabang: nearest.branch.id_cabang,
      nama_cabang: nearest.branch.nama_cabang,
      kuota_harian: quota.kuota_harian,
      kuota_terpakai: quota.kuota_terpakai,
      reschedule_date: rescheduleDate.toISOString(),
      whatsapp_template: whatsappTemplate,
    });
    return;
  }

  res.status(200).json({
    success: true,
    status: 'Dialokasikan',
    id_cabang: nearest.branch.id_cabang,
    nama_cabang: nearest.branch.nama_cabang,
    distance_km: Math.round(nearest.distance_km * 100) / 100,
    sisa_kuota: quota.sisa_kuota,
    message: `Pesanan dari "${alamat_pelanggan}" dialokasikan ke ${nearest.branch.nama_cabang} (${Math.round(nearest.distance_km * 100) / 100} km).`,
  });
});

export default router;
