const express = require("express");
const router = express.Router();
const partOfSpeechController = require("../controllers/partOfSpeechController");
const { body, validationResult } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");
const authorizeRole = require("../middlewares/authorizeRole");

router.get("/get", partOfSpeechController.getPartsOfSpeech);

router.post(
  "/create",
  authMiddleware,
  authorizeRole("Admin"),
  [body("name").notEmpty().withMessage("Part of speech name is required")],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    return partOfSpeechController.createPartOfSpeech(req, res, next);
  }
);

router.put("/:id", authMiddleware, authorizeRole("Admin"), partOfSpeechController.updatePartOfSpeech);
router.delete("/:id", authMiddleware, authorizeRole("Admin"), partOfSpeechController.deletePartOfSpeech);

module.exports = router;
