const express = require("express");
const router = express.Router();
const {
    getKanji,
    getKanjiById,
    getKanjiByJLPTLevel,
    createKanji,
    updateKanji,
    deleteKanji
} = require("../controllers/kanjiController");
const { getKanjiByStrokeCount } = require("../controllers/KanjiController");

router.get("/", getKanji);
router.get("/:id", getKanjiById);
router.get("/jlpt/:level", getKanjiByJLPTLevel);
router.get("/strokes/:count", getKanjiByStrokeCount);
router.post("/", createKanji);
router.put("/", updateKanji);
router.delete("/", deleteKanji);

module.exports = router;