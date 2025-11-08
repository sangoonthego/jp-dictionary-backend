const mongoose = require("mongoose");

const kanjiSchema = new mongoose.Schema({
  kanji: { type: String, required: true, unique: true },
  onyomi: String,
  kunyomi: String,
  meaning: { type: String, required: true },
  strokes: Number,
  jlptLevel: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Kanji", kanjiSchema);
