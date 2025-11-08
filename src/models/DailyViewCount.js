const mongoose = require("mongoose");

const dailyViewCountSchema = new mongoose.Schema({
  viewDate: { type: Date, required: true, unique: true },
  viewCount: { type: Number, default: 0 }
});

module.exports = mongoose.model("DailyViewCount", dailyViewCountSchema);
