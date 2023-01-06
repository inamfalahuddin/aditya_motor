const express = require("express");
const {
  addCustomer,
  deleteCustomer,
  getCustomer,
  getCustomerById,
  updateCustomer,
} = require("../controllers/customer.controller");
const router = express.Router();

// Mekanik
router.post("/v1/customer/", addCustomer);
router.get("/v1/customer/all", getCustomer);
router.get("/v1/customer/:id", getCustomerById);
router.put("/v1/customer/:id", updateCustomer);
router.delete("/v1/customer/:id", deleteCustomer);

module.exports = router;
