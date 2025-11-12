const ExampleService = require("../services/exampleService");

exports.getExamples = async (req, res) => {
    try {
        const examples = await ExampleService.getAllExamples();
        res.status(200).json(examples);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getExampleById = async (req, res) => {
    try {
        const example = await ExampleService.getExampleById(req.params.id);
        if (!example) return res.status(404).json({ message: "Example not found!" });
        res.status(200).json(example);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createExample = async (req, res) => {
    try {
        const newExample = await ExampleService.createExample(req.body);
        res.status(201).json(newExample);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateExample = async (req, res) => {
    try {
        const updatedExample = await ExampleService.updateExample(req.params.id, req.body);
        if (!updatedExample) return res.status(404).json({ message: "Example not found!" });
        res.status(200).json(updatedExample);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteExample = async (req, res) => {
    try {
        const deletedExample = await ExampleService.deleteExample(req.params.id);
        if (!deletedExample) return res.status(404).json({ message: "Example not found!" });
        res.status(200).json({ message: "Example deleted successfully!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Lấy examples theo WordId
exports.getExamplesByWordId = async (req, res) => {
    try {
        const { wordId } = req.params;
        const examples = await ExampleService.getExamplesByWordId(wordId);
        res.status(200).json(examples);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
