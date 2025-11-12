const Word = require("../models/Word");

class WordService {
    static async getAllWords() {
        return await Word.find();
    }

    static async getWordById(id) {
        return await Word.findById(id);
    }

    static async getWordsByPartOfSpeech(partOfSpeechId) {
        return await Word.find({ partOfSpeechId });
    }

    static async getCommonWords() {
        return await Word.find({ isCommon: true });
    }

    static async getWordsByJLPTLevel(level) {
        return await Word.find({ jlpt: level });
    }

    static async createWord(wordData) {
        const word = new Word(wordData);
        return await word.save();
    }

    static async updateWord(id, updateData) {
        return await Word.findByIdAndUpdate(id, updateData, { new: true });
    }

    static async deleteWord(id) {
        return await Word.findByIdAndDelete(id);
    }
}

module.exports = WordService;
