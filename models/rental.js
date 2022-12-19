const mongoose = require("mongoose");
const Joi = require("joi");

const rentalSchema = new mongoose.Schema({
	customer: {
		type: new mongoose.Schema({
			name: {
				type: String,
				minLength: 2,
				maxLength: 100,
				required: true,
			},
			phone: {
				type: String,
				required: true,
				minLength: 5,
				maxLength: 25,
			},
			isGold: {
				type: Boolean,
				default: false,
			},
		}),
		required: true,
	},
	movie: {
		type: new mongoose.Schema({
			title: {
				type: String,
				trim: true,
				minLength: 2,
				maxLength: 255,
				required: true,
			},
			dailyRentalRate: {
				type: Number,
				min: 0,
				max: 255,
				required: true,
			},
		}),
	},
	dateOut: {
		type: Date,
		required: true,
		default: Date.now,
	},
	dateReturned: {
		type: Date,
	},
	rentalFee: {
		type: Number,
		min: 0,
	},
});

function validateRental(rental) {
	const schema = Joi.object({
		movieId: Joi.objectId().required(),
		customerId: Joi.objectId().required(),
	});

	return schema.validate(rental);
}

const Rental = mongoose.model("Rental", rentalSchema);

exports.Rental = Rental;
exports.validate = validateRental;
