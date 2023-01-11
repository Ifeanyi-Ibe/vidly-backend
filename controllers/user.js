const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const { User, validate } = require("../models/user");

class UserController {
  constructor() {}

  addUser = async (req, res) => {
    const { name, email, password } = req.body;

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email });
    if (user) return res.status(400).send("User already registered.");

    user = new User({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    res.send(_.pick(user, ["_id", "name", "email"]));
  };

  getUser = async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");

    res.send(user);
  };

  auth = async (req, res, next) => {
    const { email, password } = req.body;

    const { error } = validateRequest(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("Invalid email or password.");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).send("Invalid email or password.");

    const token = user.generateToken();

    res.status(200).json({ token });
  };
}

const validateRequest = (req) => {
  const schema = Joi.object({
    email: Joi.string().email().min(8).max(255),
    password: Joi.string().min(8).max(255).required(),
  });

  return schema.validate(req);
};

module.exports = UserController;
