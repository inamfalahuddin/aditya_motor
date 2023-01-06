const express = require("express");
const {
  addPesanan,
  getPesananAll,
  getPesananById,
  updatePesanan,
  deletePesanan,
} = require("../controllers/pesanan.controller");
const router = express.Router();

// Pesanan
router.post("/v1/pesanan/", addPesanan);
router.get("/v1/pesanan/all", getPesananAll);
router.get("/v1/pesanan/:id", getPesananById);
router.put("/v1/pesanan/:id", updatePesanan);
router.delete("/v1/pesanan/:id", deletePesanan);

module.exports = router;
