const express = require("express");
const {
  addSuplier,
  getSuplierAll,
  getSuplierById,
  updateSuplier,
  deleteSuplier,
} = require("../controllers/suplier.controller");
const auth = require("../middleware/auth-token");

const router = express.Router();

// Suplier
router.post("/v1/suplier/", auth, addSuplier);
router.get("/v1/suplier/all", auth, getSuplierAll);
router.get("/v1/suplier/:id", auth, getSuplierById);
router.put("/v1/suplier/:id", auth, updateSuplier);
router.delete("/v1/suplier/:id", auth, deleteSuplier);

module.exports = router;
