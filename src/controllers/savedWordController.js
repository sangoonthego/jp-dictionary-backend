const SavedWordService = require("../services/savedWordService");

exports.getSavedWordByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const savedWords = await SavedWordService.getSavedWordsByUser(userId);
        res.status(200).json(savedWords);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.saveWord = async (req, res) => {
    try {
        const { userId, wordId } = req.body;
        const saved = await SavedWordService.saveWord(userId, wordId);
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.unsavedWord = async (req, res) => {
    try {
        const { userId, wordId } = req.body;
        const deleted = await SavedWordService.unsaveWord(userId, wordId);
        res.status(200).json({ message: "Word unsaved successfully!", deleted });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
