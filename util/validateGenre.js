const Joi = require("joi");

const validateGenre = () => {
	const schema = Joi.object({
		name: Joi.string().min(3).required(),
	});

	return schema;
};

module.exports = validateGenre;
