const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 5,
		maxLength: 100,
		trim: true,
		required: true,
	},
	email: {
		type: String,
		minLength: 8,
		maxLength: 255,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		minLength: 8,
		maxLength: 1024,
		required: true,
	},
	isAdmin: Boolean,
});

userSchema.methods.generateToken = function () {
	return jwt.sign(
		{ _id: this._id, isAdmin: this.isAdmin },
		process.env.vidly_authSecretKey
	);
};

const validateUser = (user) => {
	const schema = Joi.object({
		name: Joi.string().min(5).max(100).required(),
		email: Joi.string().email().min(8).max(255),
		password: Joi.string().min(8).max(255).required(),
	});

	return schema.validate(user);
};

exports.User = new mongoose.model("User", userSchema);
exports.validate = validateUser;
