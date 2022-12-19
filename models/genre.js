const mongoose = require("mongoose");
const express = require("express");
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 50,
	},
});

const validateGenre = (genre) => {
	const schema = Joi.object({
		name: Joi.string().min(3).required(),
	});

	return schema.validate(genre);
};

exports.Genre = mongoose.model("Genre", genreSchema);
exports.validate = validateGenre;
exports.genreSchema = genreSchema;
