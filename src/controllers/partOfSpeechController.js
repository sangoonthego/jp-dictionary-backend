const PartOfSpeechService = require("../services/partOfSpeechService");

exports.getPartsOfSpeech = async (req, res) => {
    try {
        const parts = await PartOfSpeechService.getAllPartsOfSpeech();
        res.status(200).json(parts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createPartOfSpeech = async (req, res) => {
    try {
        const newPart = await PartOfSpeechService.createPartOfSpeech(req.body);
        res.status(201).json(newPart);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updatePartOfSpeech = async (req, res) => {
    try {
        const updatedPart = await PartOfSpeechService.updatePartOfSpeech(req.params.id, req.body);
        if (!updatedPart) return res.status(404).json({ message: "PartOfSpeech not found!" });
        res.status(200).json(updatedPart);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deletePartOfSpeech = async (req, res) => {
    try {
        const deletedPart = await PartOfSpeechService.deletePartOfSpeech(req.params.id);
        if (!deletedPart) return res.status(404).json({ message: "PartOfSpeech not found!" });
        res.status(200).json({ message: "PartOfSpeech deleted successfully!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
