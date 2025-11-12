const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const { body } = require("express-validator");

const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
const emailRegex = /^[A-Za-z0-9._%+-]{6,}@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

router.post(
  "/register",
  [
    body("username")
      .notEmpty().withMessage("Username is required")
      .isLength({ min: 3 }).withMessage("Username must be at least 3 characters"),
    body("email")
      .notEmpty().withMessage("Email is required")
      .matches(emailRegex).withMessage("Email must have '@' and at least 6 letters before it"),
    body("password")
      .notEmpty().withMessage("Password is required")
      .matches(passwordRegex).withMessage("Password must contain at least one uppercase letter and one number"),
  ],
  register
);

router.post(
  "/login",
  [
    body("email").notEmpty().withMessage("Email is required").matches(emailRegex).withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  login
);

module.exports = router;
