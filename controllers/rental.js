const mongoose = require("mongoose");

const { Rental, validate } = require("../models/rental");
const { Customer } = require("../models/customer");
const { Movie } = require("../models/movie");

class RentalController {
	constructor() {}

	getRentals = async (req, res) => {
		const rental = await Rental.find().sort("-dateOut");
		res.send(rental);
	};

	addRental = async (req, res) => {
		const { error } = validate(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		const { customerId, movieId } = req.body;

		const customer = await Customer.findById(customerId);
		if (!customer) return res.status(400).send("Invalid customer");

		const movie = await Movie.findById(movieId);
		if (!movie) return res.status(400).send("Invalid movie");

		if (movie.numberInStock === 0)
			return res.status(400).send("Movie not in stock.");

		const rental = new Rental({
			customer: {
				_id: customer._id,
				name: customer.name,
				phone: customer.phone,
			},
			movie: {
				_id: movie._id,
				title: movie.title,
				dailyRentalRate: movie.dailyRentalRate,
			},
		});

		await rental.save();

		movie.numberInStock--;
		await movie.save();

		res.send(rental);
	};
}

module.exports = RentalController;
