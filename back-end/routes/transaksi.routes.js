const express = require("express");
const {
  addTransaksi,
  getTransaksiById,
  deleteTransaksi,
  getTransaksiAll,
} = require("../controllers/transaksi.controller");
const router = express.Router();

// Suplier
router.post("/v1/transaksi/", addTransaksi);
router.get("/v1/transaksi/all", getTransaksiAll);
router.get("/v1/transaksi/:id", getTransaksiById);
router.delete("/v1/transaksi/:id", deleteTransaksi);

module.exports = router;
