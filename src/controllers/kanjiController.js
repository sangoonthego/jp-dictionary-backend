const KanjiService = require("../services/kanjiService");

exports.getKanji = async (req, res) => {
    try {
        const kanjiList = await KanjiService.getAllKanji();
        res.status(200).json(kanjiList);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getKanjiById = async (req, res) => {
    try {
        const kanji = await KanjiService.getKanjiById(req.params.id);
        if (!kanji) return res.status(404).json({ message: "Kanji not found!" });
        res.status(200).json(kanji);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getKanjiByJLPTLevel = async (req, res) => {
    try {
        const { level } = req.params;
        const kanjiList = await KanjiService.getKanjiByJLPTLevel(level);
        res.status(200).json(kanjiList);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getKanjiByStrokeCount = async (req, res) => {
    try {
        const { strokeCount } = req.params;
        const kanjiList = await KanjiService.getKanjiByStrokeCount(strokeCount);
        res.status(200).json(kanjiList);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createKanji = async (req, res) => {
    try {
        const newKanji = await KanjiService.createKanji(req.body);
        res.status(201).json(newKanji);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateKanji = async (req, res) => {
    try {
        const updatedKanji = await KanjiService.updateKanji(req.params.id, req.body);
        if (!updatedKanji) return res.status(404).json({ message: "Kanji not found!" });
        res.status(200).json(updatedKanji);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteKanji = async (req, res) => {
    try {
        const deletedKanji = await KanjiService.deleteKanji(req.params.id);
        if (!deletedKanji) return res.status(404).json({ message: "Kanji not found!" });
        res.status(200).json({ message: "Kanji deleted successfully!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
