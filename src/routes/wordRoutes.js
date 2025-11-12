const express = require("express");
const router = express.Router();
const wordController = require("../controllers/wordController");
const { body, validationResult } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");
const authorizeRole = require("../middlewares/authorizeRole");

router.get("/get", wordController.getWords);
router.get("/:id", wordController.getWordById);

router.post(
  "/create",
  authMiddleware,
  authorizeRole("Admin"),
  [
    body("word").notEmpty().withMessage("Word is required"),
    body("meaning").notEmpty().withMessage("Meaning is required"),
    body("jlpt").optional().isString().withMessage("JLPT must be a string"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    return wordController.createWord(req, res, next);
  }
);

router.put("/:id", authMiddleware, wordController.updateWord);
router.delete("/:id", authMiddleware, wordController.deleteWord);
router.get("/part-of-speech/:partOfSpeechId", wordController.getWordsByPartOfSpeech);
router.get("/common", wordController.getCommonWords);
router.get("/jlpt/:level", wordController.getWordsByJLPTLevel);

module.exports = router;
