const mongoose = require("mongoose");

const exampleSchema = new mongoose.Schema({
    wordId: { type: mongoose.Schema.Types.ObjectId, ref: "Word", required: true },
    sentenceJP: { type: String, required: true },
    sentenceEN: { type: String, required: true },
});

module.exports = mongoose.model("Example", exampleSchema);