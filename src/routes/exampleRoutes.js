const express = require("express");
const router = express.Router();
const exampleController = require("../controllers/exampleController");
const { body, validationResult } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");
const authorizeRole = require("../middlewares/authorizeRole");

router.get("/get", exampleController.getExamples);
router.get("/:id", exampleController.getExampleById);
router.get("/word/:wordId", exampleController.getExamplesByWordId);

router.post(
  "/create",
  authMiddleware,
  authorizeRole("Admin"),
  [
    body("wordId").notEmpty().withMessage("wordId is required"),
    body("sentenceJP").notEmpty().withMessage("sentenceJP is required"),
    body("sentenceEN").notEmpty().withMessage("sentenceEN is required"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    return exampleController.createExample(req, res, next);
  }
);

router.put("/:id", authMiddleware, authorizeRole("Admin"), exampleController.updateExample);
router.delete("/:id", authMiddleware, authorizeRole("Admin"), exampleController.deleteExample);

module.exports = router;
