require("dotenv").config();

const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const { logger } = require("./middleware/logger");
const helmet = require("helmet");
const winston = require("winston");

const app = express();

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")(app);

const { PORT } = process.env;

app.use(helmet());
app.use(express.json());
app.use(logger);

app.listen(PORT, winston.info(`App is listening on port ${PORT}`));
