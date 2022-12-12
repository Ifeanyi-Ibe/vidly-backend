const mongoose = require("mongoose");

module.exports = function () {
	mongoose.set("strictQuery", false);
	mongoose
		.connect("mongodb://localhost/vidly")
		.then(() => console.log("Connected to the database..."))
		.catch((err) => console.error("error connecting to the database..."));
};
