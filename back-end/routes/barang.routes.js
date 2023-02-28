const express = require("express");
const {
  getBarangAll,
  getBarangById,
  addBarang,
  updateBarang,
  deleteBarang,
} = require("../controllers/barang.controller");
const auth = require("../middleware/auth-token");

const router = express.Router();

// Barang
router.post("/v1/barang/", auth, addBarang);
router.get("/v1/barang/all", auth, getBarangAll);
router.get("/v1/barang/:id", auth, getBarangById);
router.put("/v1/barang/:id", auth, updateBarang);
router.delete("/v1/barang/:id", auth, deleteBarang);

module.exports = router;
