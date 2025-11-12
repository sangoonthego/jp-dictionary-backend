const express = require("express");
const router = express.Router();
const partOfSpeechController = require("../controllers/partOfSpeechController");
const { body, validationResult } = require("express-validator");

router.get("/get", partOfSpeechController.getPartsOfSpeech);

router.post(
  "/create",
  [body("name").notEmpty().withMessage("Part of speech name is required")],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    return partOfSpeechController.createPartOfSpeech(req, res, next);
  }
);

router.put("/:id", partOfSpeechController.updatePartOfSpeech);
router.delete("/:id", partOfSpeechController.deletePartOfSpeech);

module.exports = router;
