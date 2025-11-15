const Word = require("../models/Word");

class WordService {
    static async getAllWords() {
        return Word.find();
    }

    static async getWordByName(name) {
        return Word.findOne({ word: name });
    }

    static async searchWords(query) {
        return Word.find({
            $or: [
                { word: { $regex: query, $options: "i" } },
                { meaning: { $regex: query, $options: "i" } },
                { reading: { $regex: query, $options: "i" } }
            ]
        });
    }

    static async getWordsByJLPTLevel(level) {
        return Word.find({ jlpt: level });
    }

    static async getWordsByIds(ids) {
        return Word.find({ _id: { $in: ids } });
    }

    static async createWord(data) {
        const word = new Word(data);
        return word.save();
    }

    static async updateWord(id, data) {
        return Word.findByIdAndUpdate(id, data, { new: true });
    }

    static async deleteWord(id) {
        return Word.findByIdAndDelete(id);
    }
}

module.exports = WordService;
