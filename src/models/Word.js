const mongoose = require("mongoose");

// part_of_speech + words
const wordSchema = mongoose.Schema({
    word: { type: String, required: true },
    reading: String,
    meaning: { type: String, required: true },
    partOfSpeechId: { type: mongoose.Schema.Types.ObjectId, ref: "PartOfSpeech" },
    jlpt: String,
    isCommon: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Word", wordSchema);

// POS chuan -> create collection partOfSpeech and reference
