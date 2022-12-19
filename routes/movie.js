const express = require("express");
const MovieController = require("../controllers/movie");

const router = express.Router();
const controller = new MovieController();

router.get("/", controller.getMovies);
router.post("/", controller.addMovie);

module.exports = router;
