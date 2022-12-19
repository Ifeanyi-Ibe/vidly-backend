const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("../models/genre");

const movieSchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
		minLength: 2,
		maxLength: 255,
		required: true,
	},
	genre: {
		type: genreSchema,
		required: true,
	},
	numberInStock: {
		type: Number,
		min: 0,
		max: 500,
		required: true,
	},
	dailyRentalRate: {
		type: Number,
		min: 0,
		max: 255,
		required: true,
	},
});

const Movie = mongoose.model("Movie", movieSchema);

const validateMovie = function (movie) {
	const schema = Joi.object({
		title: Joi.string().min(2).max(255).required(),
		genreId: Joi.objectId().required(),
		numberInStock: Joi.number().min(0).max(500).required(),
		dailyRentalRate: Joi.number().min(0).max(255).required(),
	});

	return schema.validate(movie);
};

exports.Movie = Movie;
exports.validate = validateMovie;
