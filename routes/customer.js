const express = require("express");
const CustomerController = require("../controllers/customer");

const router = express.Router();
const controller = new CustomerController();

router.get("/", controller.getCustomers);
router.get("/:id", controller.getCustomer);
router.post("/", controller.addCustomer);

module.exports = router;
