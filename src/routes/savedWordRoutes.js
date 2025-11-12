const express = require("express");
const router = express.Router();
const savedWordController = require("../controllers/savedWordController");
const { body, validationResult } = require("express-validator");

router.get("/user/:userId", savedWordController.getSavedWordByUser);

router.post(
  "/save",
  [
    body("userId").notEmpty().withMessage("userId is required"),
    body("wordId").notEmpty().withMessage("wordId is required"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    return savedWordController.saveWord(req, res, next);
  }
);

router.delete("/", savedWordController.unsavedWord);

module.exports = router;
