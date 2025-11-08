const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, passwordHash: hashed });
        res.status(201).json({ id: user._id, username, email, role: user.role });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found "});

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) return res.status(400).json({ message: "Invalid Password" });

        // create jwt token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        const roleValue = user.role === "ROLE_ADMIN" ? 2 : 1;

        res.json({
            success: true,
            roleValue,
            userId: user._id,
            token, // erturn token FE
        })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}