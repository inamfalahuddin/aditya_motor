const express = require("express");
const { login, logout, refresh } = require("../controllers/auth.controller");
const router = express.Router();

// Suplier
router.get("/v1/auth/token", refresh);
router.post("/v1/auth/login", login);
router.delete("/v1/auth/logout", logout);

module.exports = router;
