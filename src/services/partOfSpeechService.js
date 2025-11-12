const PartOfSpeech = require("../models/PartOfSpeech");

class PartOfSpeechService {
    static async getAllPartsOfSpeech() {
        return await PartOfSpeech.find();
    }

    static async createPartOfSpeech(data) {
        const exists = await PartOfSpeech.findOne({ name: data.name });
        if (exists) throw new Error("PartOfSpeech already exists!");
        const part = new PartOfSpeech(data);
        return await part.save();
    }

    static async updatePartOfSpeech(id, data) {
        return await PartOfSpeech.findByIdAndUpdate(id, data, { new: true });
    }

    static async deletePartOfSpeech(id) {
        return await PartOfSpeech.findByIdAndDelete(id);
    }
}

module.exports = PartOfSpeechService;
