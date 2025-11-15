const WordView = require("../models/WordView");
const DailyViewCount = require("../models/DailyViewCount");

class WordViewService {
    static async getWordViews(wordId) {
        let wordView = await WordView.findOne({ wordId });
        if (!wordView) {
            wordView = new WordView({ wordId, viewCount: 0 });
            await wordView.save();
        }
        return wordView;
    }

    static async getDailyViews(date) {
        const dayStart = new Date(date);
        dayStart.setHours(0, 0, 0, 0);
        const dayEnd = new Date(dayStart);
        dayEnd.setHours(23, 59, 59, 999);

        const dailyView = await DailyViewCount.findOne({ 
            viewDate: { $gte: dayStart, $lte: dayEnd } 
        });
        return dailyView || { viewDate: dayStart, viewCount: 0 };
    }

    static async incrementViewCount(wordId) {
        const wordView = await WordView.findOneAndUpdate(
            { wordId },
            { $inc: { viewCount: 1 } },
            { new: true, upsert: true }
        );

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        await DailyViewCount.findOneAndUpdate(
            { viewDate: today },
            { $inc: { viewCount: 1 } },
            { new: true, upsert: true }
        );

        return wordView;
    }

    static async getTopWordViews() {
    return await WordView.find()
        .sort({ viewCount: -1 })
        .limit(12);
    }
}

module.exports = WordViewService;
