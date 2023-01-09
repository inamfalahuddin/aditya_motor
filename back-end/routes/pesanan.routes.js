const express = require("express");
const {
  addPesanan,
  getPesananAll,
  getPesananById,
  updatePesanan,
  deletePesanan,
} = require("../controllers/pesanan.controller");
const auth = require("../middleware/auth-token");

const router = express.Router();

// Pesanan
router.post("/v1/pesanan/", auth, addPesanan);
router.get("/v1/pesanan/all", auth, getPesananAll);
router.get("/v1/pesanan/:id", auth, getPesananById);
router.put("/v1/pesanan/:id", auth, updatePesanan);
router.delete("/v1/pesanan/:id", auth, deletePesanan);

module.exports = router;
