const express = require("express");
const {
  login,
  logout,
  refresh,
  register,
  editPassword,
} = require("../controllers/auth.controller");
const auth = require("../middleware/auth-token");

const router = express.Router();

// Suplier
router.get("/v1/auth/token", refresh);
router.post("/v1/auth/login", login);
router.put("/v1/auth/pwdchange", auth, editPassword);
router.post("/v1/auth/register", register);
router.delete("/v1/auth/logout", logout);

module.exports = router;
