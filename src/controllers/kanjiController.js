const Kanji = require("../models/Kanji");

exports.getKanji = async (req, res) => {
    try {
        const kanjiList = await Kanji.find();
        res.status(200).json(kanjiList);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getKanjiById = async (req, res) => {
    try {
        const kanji = await Kanji.findById(req.params.id);
        if (!kanji) return res.status(404).json({ message: "Kanji not found!!!" });
        res.status(200).json(kanji);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getKanjiByJLPTLevel = async (req, res) => {
    try {
        const { level } = req.params;
        const kanjiList = await Kanji.find({ jlptLevel: level });
        res.status(200).json(kanjiList);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getKanjiByStrokeCount = async (req, res) => {
    try {
        const { strokeCount } = req.params;
        const kanjiList = await Kanji.find({ strokes: strokeCount });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.createKanji = async (req, res) => {
    try {
        const { kanji, onyomi, kunyomi, meaning, strokes, jlptLevel } = req.body;
        const exists = await Kanji.findOne({ kanji });
        if (exists) return res.status(400).json({ message: "Kanji already Exists!!!" });

        const newKanji = await Kanji.create({ kanji, onyomi, kunyomi, meaning, strokes, jlptLevel });
        res.status(201).json(newKanji);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.updateKanji = async (req, res) => {
    try {
        const updateKanji = await Kanji.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!updateKanji) return res.status(404).json({ message: "Kanji not Found" });
        res.status(200).json(updateKanji);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.deleteKanji = async (req, res) => {
    try {
        const deleteKanji = await Kanji.findByIdAndDelete(req.params.id);
        if (!deleteKanji) return res.status(404).json({ message: "Kanji not Found" });
        res.status(200).json({ message: "Kanji deleted Successfully!!!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}