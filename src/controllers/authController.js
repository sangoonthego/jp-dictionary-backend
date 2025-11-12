const { validationResult } = require("express-validator");
const authService = require("../services/authService");
const User = require("../models/User");

exports.register = async (req, res) => {
  const errors = validationResult(req);
  const { email } = req.body; 

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) 
      return res.status(400).json({ message: "Email already registered" });

    const user = await authService.registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const result = await authService.loginUser(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
