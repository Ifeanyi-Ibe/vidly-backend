const mongoose = require("mongoose");
const winston = require("winston");

module.exports = function () {
  mongoose.set("strictQuery", false);

  mongoose
    .connect("mongodb://127.0.0.1/vidly")
    .then(() => winston.info("Connected to the database..."));
};
