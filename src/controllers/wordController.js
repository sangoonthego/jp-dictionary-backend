const Word = require("../models/Word");

exports.getWords = async (req, res) => {
    try {
        const wordList = await Word.find();
        res.json(wordList);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getWordById = async (req, res) => {}

exports.getWordsByPartOfSpeech = async (req, res) => {}

exports.getCommonWords = async (req, res) => {}

exports.getWordsByJLPTLevel = async (req, res) => {}

exports.createWord = async (req, res) => {
    try {
        const word = await Word.create(req.body);
        res.status(201).json(word);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateWord = async (req, res) => {}

exports.deleteWord = async (req, res) => {}
