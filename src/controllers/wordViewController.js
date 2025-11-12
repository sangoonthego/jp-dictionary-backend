const WordViewService = require("../services/wordViewService");

exports.getWordViews = async (req, res) => {
    try {
        const { wordId } = req.params;
        const wordView = await WordViewService.getWordViews(wordId);
        res.status(200).json(wordView);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getDailyViews = async (req, res) => {
    try {
        const { date } = req.params; 
        const dailyView = await WordViewService.getDailyViews(date);
        res.status(200).json(dailyView);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.incrementViewCount = async (req, res) => {
    try {
        const { wordId } = req.params;
        const updatedWordView = await WordViewService.incrementViewCount(wordId);
        res.status(200).json(updatedWordView);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
