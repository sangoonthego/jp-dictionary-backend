const mongoose = require("mongoose");

const savedWordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  wordId: { type: mongoose.Schema.Types.ObjectId, ref: "Word", required: true },
  savedAt: { type: Date, default: Date.now }
});

savedWordSchema.index({ userId: 1, wordId: 1 }, { unique: true });

module.exports = mongoose.model("SavedWord", savedWordSchema);
