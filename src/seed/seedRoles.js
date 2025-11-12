const mongoose = require("mongoose");
const Role = require("../models/Role");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        const roles = ["User", "Admin"];
        for (const name of roles) {
            await Role.updateOne({ name }, { name }, { upsert: true });
        }
        console.log("Roles seeded successfully!!!");
        mongoose.disconnect();
    })
    .catch(err => console.error("Mongo error:", err));