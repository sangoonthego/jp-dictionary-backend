const { validationResult } = require("express-validator");
const authService = require("../services/authService");

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
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
