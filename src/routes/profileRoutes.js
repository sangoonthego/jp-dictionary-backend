const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const authMiddleware = require("../middlewares/authMiddleware");
const authorizeRole = require("../middlewares/authorizeRole");
const upload = require("../middlewares/uploadMiddleware");

router.get("/", authMiddleware, authorizeRole("Admin"), profileController.getProfile);
router.put("/", authMiddleware, profileController.updateProfile);
router.post("/avatar", authMiddleware, upload.single("avatar", profileController.uploadAvatar));

module.exports = router;