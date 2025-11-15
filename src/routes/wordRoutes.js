const express = require("express");
const router = express.Router();
const wordController = require("../controllers/wordController");
const { body, validationResult } = require("express-validator");

router.get("/", wordController.getAllWords); 
router.get("/search", wordController.searchWords);
router.get("/jlpt", wordController.getWordsByJlpt);

router.get("/w/:word", wordController.getWordByName);

router.post(
  "/",
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

router.post("/by-ids", wordController.getWordsByIds);

module.exports = router;
