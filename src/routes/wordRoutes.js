const express = require("express");
const router = express.Router();
const wordController = require("../controllers/wordController");
const { body, validationResult } = require("express-validator");

router.get("/get", wordController.getWords);
router.get("/:id", wordController.getWordById);

router.post(
  "/create",
  [
    body("word").notEmpty().withMessage("Word is required"),
    body("meaning").notEmpty().withMessage("Meaning is required"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    return wordController.createWord(req, res, next);
  }
);

router.put("/:id", wordController.updateWord);
router.delete("/:id", wordController.deleteWord);
router.get("/part-of-speech/:partOfSpeechId", wordController.getWordsByPartOfSpeech);
router.get("/common", wordController.getCommonWords);
router.get("/jlpt/:level", wordController.getWordsByJLPTLevel);

module.exports = router;
