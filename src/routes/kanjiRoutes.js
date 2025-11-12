const express = require("express");
const router = express.Router();
const kanjiController = require("../controllers/KanjiController");
const { body, validationResult } = require("express-validator");

router.get("/get", kanjiController.getKanji);
router.get("/:id", kanjiController.getKanjiById);
router.get("/jlpt/:level", kanjiController.getKanjiByJLPTLevel);
router.get("/strokes/:strokeCount", kanjiController.getKanjiByStrokeCount);

router.post(
  "/create",
  [
    body("kanji").notEmpty().withMessage("Kanji is required"),
    body("meaning").notEmpty().withMessage("Meaning is required"),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    // call controller if valid
    return kanjiController.createKanji(req, res, next);
  }
);

router.put("/:id", kanjiController.updateKanji);
router.delete("/:id", kanjiController.deleteKanji);

module.exports = router;
