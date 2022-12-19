const express = require("express");
const genreRoutes = require("../routes/genre");
const customerRoutes = require("../routes/customer");
const movieRoutes = require("../routes/movie");
const rentalRoutes = require("../routes/rentals");
const userRoutes = require("../routes/user");
const errorHandler = require("../middleware/error");

module.exports = function (app) {
	app.use("/api/genre", genreRoutes);
	app.use("/api/customer", customerRoutes);
	app.use("/api/movies", movieRoutes);
	app.use("/api/rentals", rentalRoutes);
	app.use("/api/users", userRoutes);
	app.use(errorHandler);
};
