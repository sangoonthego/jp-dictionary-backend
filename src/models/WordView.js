const mongoose = require("mongoose");

const wordViewSchema = new mongoose.Schema({
  wordId: { type: mongoose.Schema.Types.ObjectId, ref: "Word", required: true, unique: true },
  viewCount: { type: Number, default: 0 }
});

module.exports = mongoose.model("WordView", wordViewSchema);
