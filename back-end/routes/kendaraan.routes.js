const express = require("express");
const {
  addKendaraan,
  getKendaraanAll,
  getKendaraanById,
  updateKendaraan,
  deleteKendaraan,
} = require("../controllers/kendaraan.controller");
const router = express.Router();

// Pesanan
router.post("/v1/kendaraan/", addKendaraan);
router.get("/v1/kendaraan/all", getKendaraanAll);
router.get("/v1/kendaraan/:id", getKendaraanById);
router.put("/v1/kendaraan/:id", updateKendaraan);
router.delete("/v1/kendaraan/:id", deleteKendaraan);

module.exports = router;
