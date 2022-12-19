const morgan = require("morgan");

module.exports = function (app) {
	if (!process.env.vidly_authSecretKey) {
		throw new Error(
			"FATAL ERROR: vidly_authSecretKey environment variable is not set."
		);
	}

	if (app.get("env") === "development") {
		app.use(morgan("tiny"));
		console.log("Morgan enabled!");
	}
};
