const Kanji = require("../models/Kanji");
const { buildQueryOptions } = require("../helpers/queryHelper");
const { validateJLPT, validateStrokes, checkDuplicateKanji } = require("../helpers/validationHelper");

const searchFields = ["kanji","onyomi","kunyomi","meaning"];

class KanjiService {
  static async getKanji(queryParams) {
    if (queryParams.jlptLevel) validateJLPT(queryParams.jlptLevel);
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
    if (strokes) validateStrokes(strokes);
    if (jlptLevel) validateJLPT(jlptLevel);
    await checkDuplicateKanji(kanji);
    const newKanji = new Kanji(data);
    return await newKanji.save();
  }

  static async updateKanji(id, data) {
    const { kanji, strokes, jlptLevel } = data;
    if (strokes) validateStrokes(strokes);
    if (jlptLevel) validateJLPT(jlptLevel);
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

  static async bulkInsertKanji(kanjiArray) {
    if (!Array.isArray(kanjiArray) || kanjiArray.length === 0) {
      throw new Error("Input must be a non-empty array of Kanji");
    }

    const inserted = [];
    const skipped = [];

    for (const data of kanjiArray) {
      try {
        const { kanji, meaning, strokes, jlptLevel } = data;
        if (!kanji || !meaning) throw new Error("Kanji and meaning are required");
        if (strokes && (typeof strokes !== "number" || strokes <= 0)) throw new Error("Invalid strokes");
        if (jlptLevel && !["N5","N4","N3","N2","N1"].includes(jlptLevel)) throw new Error("Invalid JLPT level");

        const exists = await Kanji.findOne({ kanji });
        if (exists) {
          skipped.push(kanji);
          continue;
        }

        const newKanji = new Kanji(data);
        await newKanji.save();
        inserted.push(kanji);
      } catch (err) {
        skipped.push(data.kanji || "Unknown");
      }
    }

    return {
      success: true,
      inserted,
      skipped,
      message: `Inserted ${inserted.length} Kanji, skipped ${skipped.length} (duplicates or invalid)`
    };
  }
}

module.exports = KanjiService;
