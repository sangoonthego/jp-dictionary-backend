const SavedWord = require("../models/SavedWord");

class SavedWordService {
    static async getSavedWordsByUser(userId) {
        return await SavedWord.find({ userId }).populate("wordId", "word meaning reading jlpt isCommon");
    }

    static async saveWord(userId, wordId) {
        const exists = await SavedWord.findOne({ userId, wordId });
        if (exists) throw new Error("Word already saved!");
        const saved = new SavedWord({ userId, wordId });
        return await saved.save();
    }

    static async unsaveWord(userId, wordId) {
        const deleted = await SavedWord.findOneAndDelete({ userId, wordId });
        if (!deleted) throw new Error("Saved word not found!");
        return deleted;
    }
}

module.exports = SavedWordService;
