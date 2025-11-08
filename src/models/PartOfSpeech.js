const mongoose = require("mongoose");

const partOfSpeechSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true }
});

module.exports = mongoose.model("PartOfSpeech", partOfSpeechSchema);
