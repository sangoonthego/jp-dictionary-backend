const WordService = require("../services/wordService");

exports.getWords = async (req, res) => {
    try {
        const wordList = await WordService.getAllWords();
        res.status(200).json(wordList);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getWordById = async (req, res) => {
    try {
        const word = await WordService.getWordById(req.params.id);
        if (!word) return res.status(404).json({ message: "Word not found!" });
        res.status(200).json(word);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getWordsByPartOfSpeech = async (req, res) => {
    try {
        const { partOfSpeechId } = req.params;
        const wordList = await WordService.getWordsByPartOfSpeech(partOfSpeechId);
        res.status(200).json(wordList);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCommonWords = async (req, res) => {
    try {
        const wordList = await WordService.getCommonWords();
        res.status(200).json(wordList);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getWordsByJLPTLevel = async (req, res) => {
    try {
        const { level } = req.params;
        const wordList = await WordService.getWordsByJLPTLevel(level);
        res.status(200).json(wordList);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createWord = async (req, res) => {
    try {
        const word = await WordService.createWord(req.body);
        res.status(201).json(word);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateWord = async (req, res) => {
    try {
        const updatedWord = await WordService.updateWord(req.params.id, req.body);
        if (!updatedWord) return res.status(404).json({ message: "Word not found!" });
        res.status(200).json(updatedWord);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteWord = async (req, res) => {
    try {
        const deletedWord = await WordService.deleteWord(req.params.id);
        if (!deletedWord) return res.status(404).json({ message: "Word not found!" });
        res.status(200).json({ message: "Word deleted successfully!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
