const express = require("express");
const { login, logout } = require("../controllers/auth.controller");
const router = express.Router();

// Suplier
router.post("/v1/auth/login", login);
router.delete("/v1/auth/logout", logout);

module.exports = router;
