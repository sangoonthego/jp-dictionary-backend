const WordService = require("../services/wordService");

exports.getAllWords = async (req, res) => {
    try {
        const { q } = req.query;
        let words;

        if (q) words = await WordService.searchWords(q);
        else words = await WordService.getAllWords();

        res.status(200).json(words);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getWordByName = async (req, res) => {
    try {
        const { word } = req.params;
        const result = await WordService.getWordByName(word);

        if (!result) return res.status(404).json({ message: "Word not found" });

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.searchWords = async (req, res) => {
    try {
        const { query } = req.query;
        const words = await WordService.searchWords(query);
        res.status(200).json(words);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getWordsByJlpt = async (req, res) => {
    try {
        const { jlpt_level } = req.query;
        const words = await WordService.getWordsByJLPTLevel(jlpt_level);
        res.status(200).json(words);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.createWord = async (req, res) => {
    try {
        const newWord = await WordService.createWord(req.body);
        res.status(201).json(newWord);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateWord = async (req, res) => {
    try {
        const updated = await WordService.updateWord(req.params.id, req.body);
        if (!updated) return res.status(404).json({ message: "Word not found" });
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteWord = async (req, res) => {
    try {
        const deleted = await WordService.deleteWord(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Word not found" });
        res.status(200).json({ message: "Word deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getWordsByIds = async (req, res) => {
    try {
        const { ids } = req.body;
        const words = await WordService.getWordsByIds(ids);
        res.status(200).json(words);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
