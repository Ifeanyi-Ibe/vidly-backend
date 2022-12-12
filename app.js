const express = require("express");
const { logger } = require("./middleware/logger");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const genreRoutes = require("./routes/genre");
const db = require("./db");

require("dotenv").config();

const app = express();
const { PORT } = process.env;

app.use(helmet());
app.use(express.json());
app.use(logger);

if (app.get("env") === "development") {
	app.use(morgan("tiny"));
	console.log("Morgan enabled!");
}

console.log(config.get("host.mail"));

db();

app.use("/api/genre", genreRoutes);
app.listen(PORT, console.log(`App is listening on port ${PORT}`));
