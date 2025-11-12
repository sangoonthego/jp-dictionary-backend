const Example = require("../models/Example");

class ExampleService {
    static async getAllExamples() {
        return await Example.find().populate("wordId", "word meaning reading");
    }

    static async getExampleById(id) {
        return await Example.findById(id).populate("wordId", "word meaning reading");
    }

    static async createExample(data) {
        const example = new Example(data);
        return await example.save();
    }

    static async updateExample(id, data) {
        return await Example.findByIdAndUpdate(id, data, { new: true });
    }

    static async deleteExample(id) {
        return await Example.findByIdAndDelete(id);
    }

    static async getExamplesByWordId(wordId) {
        return await Example.find({ wordId }).populate("wordId", "word meaning reading");
    }
}

module.exports = ExampleService;
