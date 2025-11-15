const KanjiService = require("../services/kanjiService");

exports.getKanji = async (req, res) => {
  try {
    const result = await KanjiService.getKanji(req.query);
    res.json(result);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getKanjiById = async (req, res) => {
  try {
    const kanji = await KanjiService.getKanjiById(req.params.id);
    if (!kanji) return res.status(404).json({ success: false, message: "Kanji not found" });
    res.json({ success: true, data: kanji });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getKanjiByJLPTLevel = async (req, res) => {
  try {
    const result = await KanjiService.getKanjiByJLPTLevel(req.params.level, req.query);
    res.json(result);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getKanjiByStrokeCount = async (req, res) => {
  try {
    const result = await KanjiService.getKanjiByStrokeCount(req.params.strokeCount, req.query);
    res.json(result);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.createKanji = async (req, res) => {
  try {
    const kanji = await KanjiService.createKanji(req.body);
    res.status(201).json({ success: true, data: kanji });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.updateKanji = async (req, res) => {
  try {
    const kanji = await KanjiService.updateKanji(req.params.id, req.body);
    res.json({ success: true, data: kanji });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteKanji = async (req, res) => {
  try {
    await KanjiService.deleteKanji(req.params.id);
    res.json({ success: true, message: "Kanji deleted successfully" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.bulkInsertKanji = async (req, res) => {
  try {
    const kanjiArray = req.body;
    const result = await KanjiService.bulkInsertKanji(kanjiArray);
    res.status(201).json({ success: true, insertedCount: result.length, data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
