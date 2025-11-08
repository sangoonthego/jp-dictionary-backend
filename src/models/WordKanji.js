const mongoose = require("mongoose");

const wordKanjiSchema = new mongoose.Schema({
  wordId: { type: mongoose.Schema.Types.ObjectId, ref: "Word", required: true },
  kanjiId: { type: mongoose.Schema.Types.ObjectId, ref: "Kanji", required: true }
});

module.exports = mongoose.model("WordKanji", wordKanjiSchema);
