const User = require("../models/User");
const bcrypt = require("bcryptjs");

class ProfileService {
    static async getProfile(userId) {
        return await User.findById(userId)
        .select("-passwordHash")
        .populate("roleId", "name");
    }

    static async updateProfile(userId, data) {
        const updateData = {};

        if (data.username) updateData.username = data.username;
        if (data.phone) updateData.phone = data.phone;
        if (data.jlptLevel) updateData.jlptLevel = data.jlptLevel;
        if (data.birthday) updateData.birthday = data.birthday;
        if (data.avatar) updateData.avatar = data.avatar;

        // change pass
        if (data.password) {
            const hashed = await bcrypt.hash(data.password, 10);
            updateData.passwordHash = hashed;
        }

        return await User.findByIdAndUpdate(userId, updateData, { new: true }).select("-passwordHash");
    }

    static async updateAvatar(userId, avatarPath) {
        return await User.findByIdAndUpdate(userId, { avatar: avatarPath}, { new: true}).select("-passwordHash");
    }
}

module.exports = ProfileService;