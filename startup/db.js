const mongoose = require("mongoose");
const winston = require("winston");

module.exports = function () {
	mongoose.set("strictQuery", false);

	mongoose
		.connect("mongodb://localhost/vidly")
		.then(() => winston.info("Connected to the database..."));
};
