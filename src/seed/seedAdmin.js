require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Role = require("../models/Role");
const connectDB = require("../config/db");

async function seedAdmin() {
  try {
    await connectDB();

    const adminRole = await Role.findOne({ name: "Admin" });
    if (!adminRole) {
      console.log("Role 'Admin' not Exists. Please seed roles first.");
      process.exit(1);
    }

    const existingAdmin = await User.findOne({ email: "myadmin@gmail.com" });
    if (existingAdmin) {
      console.log("Admin Existed:", existingAdmin.email);
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("Admin1234", 10); 

    const admin = await User.create({
      username: "admin1",
      email: "myadmin@gmail.com",
      passwordHash: hashedPassword,
      roleId: adminRole._id,
    });

    console.log("Admin created successfully!");
    console.log("Email:", admin.email);
    console.log("Password: Admin1234");

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedAdmin();
