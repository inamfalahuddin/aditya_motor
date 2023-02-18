const express = require("express");
const {
  addKendaraan,
  getKendaraanAll,
  getKendaraanById,
  updateKendaraan,
  deleteKendaraan,
  getKendaraanByCust,
} = require("../controllers/kendaraan.controller");
const auth = require("../middleware/auth-token");

const router = express.Router();

// Pesanan
router.post("/v1/kendaraan/", addKendaraan);
router.get("/v1/kendaraan/all", auth, getKendaraanAll);
router.get("/v1/kendaraan/:id", auth, getKendaraanById);
router.get("/v1/kendaraan/cust/:id", auth, getKendaraanByCust);
router.put("/v1/kendaraan/:id", auth, updateKendaraan);
router.delete("/v1/kendaraan/:id", auth, deleteKendaraan);

module.exports = router;
