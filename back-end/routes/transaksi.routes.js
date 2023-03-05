const express = require("express");
const {
  addTransaksi,
  getTransaksiById,
  deleteTransaksi,
  getTransaksiAll,
  getTransaksiByUserId,
  updateTransaksi,
} = require("../controllers/transaksi.controller");
const auth = require("../middleware/auth-token");

const router = express.Router();

// Suplier
router.post("/v1/transaksi/", auth, addTransaksi);
router.get("/v1/transaksi/all", auth, getTransaksiAll);
router.get("/v1/transaksi/:id", getTransaksiById);
router.get("/v1/transaksi/user/:id", auth, getTransaksiByUserId);
router.put("/v1/transaksi/:id", updateTransaksi);
router.delete("/v1/transaksi/:id", auth, deleteTransaksi);

module.exports = router;
