const express = require("express");
const {
  getRekening,
  updateRekening,
} = require("../controllers/pembayaran.controller");

const auth = require("../middleware/auth-token");

const router = express.Router();

router.get("/v1/rekening", auth, getRekening);
router.put("/v1/rekening", auth, updateRekening);

module.exports = router;
