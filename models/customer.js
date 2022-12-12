const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 2,
		maxLength: 100,
		required: true,
	},
	email: {
		type: String,
		minLength: 8,
		maxLength: 124,
		unique: true,
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
});

const validateCustomer = (customer) => {
	const schema = Joi.object({
		name: Joi.string().min(2).max(100).required(),
		email: Joi.string().email().min(8).max(124),
		phone: Joi.string().min(5).max(25).required(),
		isGold: Joi.boolean(),
	});

	return schema.validate(customer);
};

exports.Customer = new mongoose.model("Customer", customerSchema);
exports.validate = validateCustomer;
