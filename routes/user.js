const express = require("express");
const UserController = require("../controllers/user");
const auth = require("../middleware/auth");

const router = express.Router();
const controller = new UserController();

router.post("/", controller.addUser);
router.post("/login", controller.auth);
router.get("/me", auth, controller.getUser);

module.exports = router;
