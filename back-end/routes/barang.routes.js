const express = require("express");
const {
  getBarangAll,
  getBarangById,
  addBarang,
  updateBarang,
  deleteBarang,
} = require("../controllers/barang.controller");
const router = express.Router();

// Barang
router.post("/v1/barang/", addBarang);
router.get("/v1/barang/all", getBarangAll);
router.get("/v1/barang/:id", getBarangById);
router.put("/v1/barang/:id", updateBarang);
router.delete("/v1/barang/:id", deleteBarang);

module.exports = router;
