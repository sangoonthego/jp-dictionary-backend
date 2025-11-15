const express = require("express");
const router = express.Router();
const kanjiController = require("../controllers/kanjiController");
const { body, validationResult } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");
const authorizeRole = require("../middlewares/authorizeRole");

router.get("/", kanjiController.getKanji);
router.get("/:id", kanjiController.getKanjiById);
router.get("/jlpt/:level", kanjiController.getKanjiByJLPTLevel);
router.get("/strokes/:strokeCount", kanjiController.getKanjiByStrokeCount);

router.post(
  "/",
  authMiddleware,
  authorizeRole("Admin"),
  [
    body("kanji").notEmpty().withMessage("Kanji is required"),
    body("meaning").notEmpty().withMessage("Meaning is required"),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    return kanjiController.createKanji(req, res, next);
  }
);

router.post("/bulk", authMiddleware, authorizeRole("Admin"), kanjiController.bulkInsertKanji);

router.put("/:id", authMiddleware, authorizeRole("Admin"), kanjiController.updateKanji);
router.delete("/:id", authMiddleware, authorizeRole("Admin"), kanjiController.deleteKanji);

module.exports = router;
