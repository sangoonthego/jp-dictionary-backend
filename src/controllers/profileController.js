const ProfileService = require("../services/profileService");

exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await ProfileService.getProfile(userId);

        if (!user) return res.status(404).json({ message: "User Not Found!!! "});

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log(req.body);
        const updateUser = await ProfileService.updateProfile(userId, req.body);

        if (!updateUser) return res.status(404).json({ message: "User Not Found!!! "});

        res.status(200).json({
            message: "Profile Updated Successfully!!!",
            user: updateUser,
        });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: "Duplicate Field Value", details: err.keyValue });
        }
        res.status(400).json({ message: err.message });
    }
};

exports.uploadAvatar = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!req.file) return res.status(400).json({ message: "No file Uploaded!!!" });

        const avatarRelativePath = `uploads/avatars/${req.file.filename}`;
        const updateUser = await ProfileService.updateAvatar(userId, avatarRelativePath);
        
        res.status(200).json({ message: "Avatar Uploaded", avatar: updateUser.avatar });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}