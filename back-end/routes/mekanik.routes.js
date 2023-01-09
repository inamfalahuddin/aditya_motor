const express = require("express");
const router = express.Router();
const {
  getMekanikAll,
  getMekanikById,
  addMekanik,
  updateMekanik,
  deleteMekanik,
} = require("../controllers/mekanik.controller");
const auth = require("../middleware/auth-token");

// Mekanik
router.post("/v1/mekanik/", auth, addMekanik);
router.get("/v1/mekanik/all", auth, getMekanikAll);
router.get("/v1/mekanik/:id", auth, getMekanikById);
router.put("/v1/mekanik/:id", auth, updateMekanik);
router.delete("/v1/mekanik/:id", auth, deleteMekanik);

module.exports = router;
