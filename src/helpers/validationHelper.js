const Kanji = require("../models/Kanji");

const validLevels = ["N5","N4","N3","N2","N1"];

const validateJLPT = (level) => {
  if (level && !validLevels.includes(level)) throw new Error("Invalid JLPT level");
};

const validateStrokes = (strokes) => {
  if (strokes !== undefined && isNaN(Number(strokes))) throw new Error("Strokes must be a number");
};

const checkDuplicateKanji = async (kanji, excludeId = null) => {
  const query = { kanji };
  if (excludeId) query._id = { $ne: excludeId };
  const exists = await Kanji.findOne(query);
  if (exists) throw new Error("Kanji already exists!");
};

module.exports = { validLevels, validateJLPT, validateStrokes, checkDuplicateKanji };
