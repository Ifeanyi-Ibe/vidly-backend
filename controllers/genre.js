const express = require("express");
const validateGenre = require("../util/validateGenre");
const Genre = require("../model/genre");
const Joi = require("joi");

const schema = Joi.object({
	name: Joi.string().min(3).required(),
});

class GenreController {
	constructor() {}

	getGenres = async function (req, res) {
		const genres = await Genre.find().sort("name");

		res.send(genres);
	};

	addGenre = async function (req, res) {
		const { error, value } = schema.validate(req.body);
		if (error) {
			console.error(error);
			return res.status(400).send(error.details[0].message);
		}

		let genre = new Genre({ name: req.body.name });
		genre = await genre.save();

		res.send(genre);
	};

	editGenre = async function (req, res) {
		const { error } = schema.validate(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		const { id } = req.params;

		const genre = await Genre.findByIdAndUpdate(
			id,
			{ name: req.body.name },
			{ new: true }
		);

		if (!genre)
			return res
				.status(404)
				.send("The genre with the given ID does not exist.");

		res.send(genre);
	};

	deleteGenre = async function (req, res) {
		const { id } = req.params;

		const genre = await Genre.findByIdAndRemove(id);

		if (!genre)
			return res
				.status(404)
				.send("The genre with the given ID does not exist.");

		res.send(genre);
	};

	getGenre = async function (req, res) {
		const genre = await Genre.findById(req.params.id);

		if (!genre)
			return res
				.status(404)
				.send("The genre with the given ID does not exist.");

		res.send(genre);
	};
}

module.exports = GenreController;
