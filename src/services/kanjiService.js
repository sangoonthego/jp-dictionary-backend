// services/kanjiService.js
const Kanji = require("../models/Kanji");
const { buildQueryOptions } = require("../helpers/queryHelper");
const { validateJLPT, validateStrokes, checkDuplicateKanji } = require("../helpers/validationHelper");

const searchFields = ["kanji","onyomi","kunyomi","meaning"];

class KanjiService {
  static async getKanji(queryParams) {
    validateJLPT(queryParams.jlptLevel);
    if (queryParams.minStrokes) validateStrokes(queryParams.minStrokes);
    if (queryParams.maxStrokes) validateStrokes(queryParams.maxStrokes);

    const { query, skip, limit, sortOption, page } = buildQueryOptions(queryParams, searchFields);
    const data = await Kanji.find(query).sort(sortOption).skip(skip).limit(limit);
    const total = await Kanji.countDocuments(query);
    return { success: true, page, limit, total, totalPages: Math.ceil(total / limit), data };
  }

  static async getKanjiById(id) {
    return await Kanji.findById(id);
  }

  static async getKanjiByJLPTLevel(level, queryParams = {}) {
    validateJLPT(level);
    const { query, skip, limit, sortOption, page } = buildQueryOptions(queryParams, searchFields, { jlptLevel: level });
    const data = await Kanji.find(query).sort(sortOption).skip(skip).limit(limit);
    const total = await Kanji.countDocuments(query);
    return { success: true, page, limit, total, totalPages: Math.ceil(total / limit), data };
  }

  static async getKanjiByStrokeCount(strokeCount, queryParams = {}) {
    validateStrokes(strokeCount);
    const { query, skip, limit, sortOption, page } = buildQueryOptions(queryParams, searchFields, { strokes: Number(strokeCount) });
    const data = await Kanji.find(query).sort(sortOption).skip(skip).limit(limit);
    const total = await Kanji.countDocuments(query);
    return { success: true, page, limit, total, totalPages: Math.ceil(total / limit), data };
  }

  static async createKanji(data) {
    const { kanji, strokes, jlptLevel } = data;
    if (!kanji || !data.meaning) throw new Error("Kanji and meaning are required");
    validateStrokes(strokes);
    validateJLPT(jlptLevel);
    await checkDuplicateKanji(kanji);
    const newKanji = new Kanji(data);
    return await newKanji.save();
  }

  static async updateKanji(id, data) {
    const { kanji, strokes, jlptLevel } = data;
    validateStrokes(strokes);
    validateJLPT(jlptLevel);
    if (kanji) await checkDuplicateKanji(kanji, id);
    const updated = await Kanji.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!updated) throw new Error("Kanji not found");
    return updated;
  }

  static async deleteKanji(id) {
    const deleted = await Kanji.findByIdAndDelete(id);
    if (!deleted) throw new Error("Kanji not found");
    return deleted;
  }
}

module.exports = KanjiService;
