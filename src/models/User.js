const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    roleId: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
    // user profile
    avatar: { type: String, default: "" },
    phone: { type: String, default: "" },
    jlptLevel: { type: String, enum: ["N5", "N4", "N3", "N2", "N1", ""], default: "" },
    birthday: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);