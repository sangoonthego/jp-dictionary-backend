const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async ({ username, email, password }) => {
  const hashed = await bcrypt.hash(password, 10);
  const defaultRole = await Role.findOne({ name: "User" });
  if (!defaultRole) throw new Error("Default role 'User' not found");

  const user = await User.create({
    username,
    email,
    passwordHash: hashed,
    roleId: defaultRole._id,
  });

  return {
    id: user._id,
    username: user.username,
    email: user.email,
    roleId: user.roleId,
  };
};

exports.loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).populate("roleId");
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) throw new Error("Invalid password");

  const token = jwt.sign(
    { id: user._id, role: user.roleId.name },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  const roleValue = user.roleId.name === "Admin" ? 2 : 1;

  return {
    success: true,
    roleValue,
    userId: user._id,
    token,
  };
};
