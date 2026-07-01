"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const georouting_js_1 = require("../services/georouting.js");
const quota_js_1 = require("../services/quota.js");
const router = (0, express_1.Router)();
router.post('/allocate', (req, res) => {
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
    const nearest = (0, georouting_js_1.findNearestBranch)(koordinat);
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
    const quota = (0, quota_js_1.checkQuota)(nearest.branch.id_cabang);
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
        const rescheduleDate = (0, quota_js_1.getNextBusinessDay)();
        const whatsappTemplate = (0, quota_js_1.generateDelayMessage)(nearest.branch, rescheduleDate);
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
exports.default = router;
//# sourceMappingURL=orders.js.map