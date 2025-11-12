const Kanji = require("../models/Kanji");

class KanjiService {
    static async getAllKanji() {
        return await Kanji.find();
    }

    static async getKanjiById(id) {
        return await Kanji.findById(id);
    }

    static async getKanjiByJLPTLevel(level) {
        return await Kanji.find({ jlptLevel: level });
    }

    static async getKanjiByStrokeCount(strokeCount) {
        return await Kanji.find({ strokes: strokeCount });
    }

    static async createKanji(data) {
        const exists = await Kanji.findOne({ kanji: data.kanji });
        if (exists) throw new Error("Kanji already exists!");
        const newKanji = new Kanji(data);
        return await newKanji.save();
    }

    static async updateKanji(id, data) {
        return await Kanji.findByIdAndUpdate(id, data, { new: true });
    }

    static async deleteKanji(id) {
        return await Kanji.findByIdAndDelete(id);
    }
}

module.exports = KanjiService;
