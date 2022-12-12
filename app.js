const express = require("express");
require("dotenv").config();

const app = express();
const { PORT } = process.env;

app.get("/", (req, res) => {
	res.status(200).send("Welcome to Vidly! Glad to have you here");
});

app.listen(PORT, console.log(`App is listening on port ${PORT}`));
