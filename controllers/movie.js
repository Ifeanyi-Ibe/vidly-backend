const { Movie, validate } = require("../models/movie");
const { Genre } = require("../models/genre");

class MovieController {
	constructor() {}

	getMovies = async (req, res) => {
		const movies = await Movie.find().sort("name");

		//if (movies.length < 1) return res.status(404).send("No movies found");

		res.send(movies);
	};

	addMovie = async (req, res) => {
		const { title, numberInStock, dailyRentalRate, genreId } = req.body;

		const { error } = validate(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		const genre = await Genre.findById(genreId);
		if (!genre) return res.status(400).send("Invalid genre.");

		const movie = new Movie({
			title,
			numberInStock,
			dailyRentalRate,
			genre: {
				_id: genre._id,
				name: genre.name,
			},
		});

		await movie.save();

		res.send(movie);
	};
}

module.exports = MovieController;
