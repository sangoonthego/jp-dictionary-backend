const exporess = require("express");
const router = exporess.Router();
const { getWords, createWord } = require("../controllers/wordController");

router.get("/", getWords);
router.post("/", createWord);

module.exports = router;