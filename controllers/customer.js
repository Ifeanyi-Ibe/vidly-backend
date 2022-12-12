const express = require("express");
var ObjectId = require("mongoose").Types.ObjectId;
const { Customer, validate } = require("../models/customer");

class CustomerController {
	constructor() {}

	getCustomers = async (req, res) => {
		const customers = await Customer.find().sort("name");

		if (!customers || customers.length === 0)
			return res.send("No customers found!");
		res.status(200).send(customers);
	};

	getCustomer = async (req, res) => {
		const isValid = ObjectId.isValid(req.params.id);
		if (!isValid) return res.status(400).send("Invalid ID.");

		const customer = await Customer.findById(req.params.id);
		if (!customer)
			return res
				.status(404)
				.send("Customer with the given ID does not exist.");

		res.status(200).send(customer);
	};

	addCustomer = async (req, res) => {
		const { name, email, phone, isGold } = req.body;

		const { error } = validate(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		const existingCustomer = await Customer.findOne({ email: email });
		if (existingCustomer)
			return res
				.status(400)
				.send("A customer with the provided email already exists.");

		let customer = new Customer({ name, email, phone, isGold });
		customer.save();

		res.status(200).send(customer);
	};
}

module.exports = CustomerController;
