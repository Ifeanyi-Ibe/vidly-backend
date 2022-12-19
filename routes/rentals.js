const express = require("express");
const RentalController = require("../controllers/rental");

const router = express.Router();
const controller = new RentalController();

router.get("/", controller.getRentals);
router.post("/", controller.addRental);

module.exports = router;
