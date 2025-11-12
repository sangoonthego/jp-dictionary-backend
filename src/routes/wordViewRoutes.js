const express = require("express");
const router = express.Router();
const wordViewController = require("../controllers/wordViewController");
const { body, param, validationResult } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");
const authorizeRole = require("../middlewares/authorizeRole");

router.get(
  "/:wordId",
  [param("wordId").notEmpty().withMessage("wordId is required")],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    return wordViewController.getWordViews(req, res, next);
  }
);

router.get(
  "/daily/:date",
  [param("date").notEmpty().withMessage("Date is required")],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    return wordViewController.getDailyViews(req, res, next);
  }
);

router.post(
  "/increment/:wordId",
  [param("wordId").notEmpty().withMessage("wordId is required")],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    return wordViewController.incrementViewCount(req, res, next);
  }
);

module.exports = router;
