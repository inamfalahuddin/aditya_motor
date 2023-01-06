const express = require("express");
const router = express.Router();
const {
  getMekanikAll,
  getMekanikById,
  addMekanik,
  updateMekanik,
  deleteMekanik,
} = require("../controllers/mekanik.controller");

// Mekanik
router.post("/v1/mekanik/", addMekanik);
router.get("/v1/mekanik/all", getMekanikAll);
router.get("/v1/mekanik/:id", getMekanikById);
router.put("/v1/mekanik/:id", updateMekanik);
router.delete("/v1/mekanik/:id", deleteMekanik);

module.exports = router;
