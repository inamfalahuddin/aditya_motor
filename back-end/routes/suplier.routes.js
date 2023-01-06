const express = require("express");
const {
  addSuplier,
  getSuplierAll,
  getSuplierById,
  updateSuplier,
  deleteSuplier,
} = require("../controllers/suplier.controller");
const router = express.Router();

// Suplier
router.post("/v1/suplier/", addSuplier);
router.get("/v1/suplier/all", getSuplierAll);
router.get("/v1/suplier/:id", getSuplierById);
router.put("/v1/suplier/:id", updateSuplier);
router.delete("/v1/suplier/:id", deleteSuplier);

module.exports = router;
