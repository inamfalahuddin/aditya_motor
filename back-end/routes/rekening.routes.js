const express = require("express");
const {
  getRekening,
  updateRekening,
  getPembayaran,
  addPembayaran,
  konfirmasiPembayaran,
} = require("../controllers/pembayaran.controller");

const auth = require("../middleware/auth-token");
const upload = require("../middleware/upload-file");

const router = express.Router();

router.get("/v1/rekening", auth, getRekening);
router.put("/v1/rekening", auth, updateRekening);
router.get("/v1/pembayaran/:id", auth, getPembayaran);
router.post("/v1/pembayaran", upload.single("bukti_pembayaran"), addPembayaran);

router.put("/v1/konfirmasi/:id", auth, konfirmasiPembayaran);

module.exports = router;
