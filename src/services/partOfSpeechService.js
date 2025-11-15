const PartOfSpeech = require("../models/PartOfSpeech");
const axios = require("axios");

class PartOfSpeechService {
    static async fetchPartsOfSpeechFromAPI() {
        const url = "https://api.jisho.org/part-of-speech"; 
        const response = await axios.get(url);
        return response.data;
    }

    static async getAllPartsOfSpeech() {
        return await PartOfSpeech.find();
    }

    static async getPartOfSpeechById(id) {
        return await PartOfSpeech.findById(id);
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
