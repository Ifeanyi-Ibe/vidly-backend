const express = require("express");
const GenreController = require("../controllers/genre");
const router = express.Router();

const controller = new GenreController();

router.get("/", controller.getGenres);
router.get("/:id", controller.getGenre);
router.post("/", controller.addGenre);
router.put("/:id", controller.editGenre);
router.delete("/:id", controller.deleteGenre);

module.exports = router;
