const express = require("express");
const {
  addCustomer,
  deleteCustomer,
  getCustomer,
  getCustomerById,
  updateCustomer,
} = require("../controllers/customer.controller");
const auth = require("../middleware/auth-token");

const router = express.Router();

// Mekanik
router.post("/v1/customer/", auth, addCustomer);
router.get("/v1/customer/all", auth, getCustomer);
router.get("/v1/customer/:id", auth, getCustomerById);
router.put("/v1/customer/:id", auth, updateCustomer);
router.delete("/v1/customer/:id", auth, deleteCustomer);

module.exports = router;
