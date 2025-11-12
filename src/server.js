require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const errorHandler = require("./middlewares/errorHandler");
const authRoutes = require("./routes/authRoutes");
const wordRoutes = require("./routes/wordRoutes");
const kanjiRoutes = require("./routes/kanjiRoutes");
const exampleRoutes = require("./routes/exampleRoutes");
const partOfSpeechRoutes = require("./routes/partOfSpeechRoutes");
const savedWordRoutes = require("./routes/savedWordRoutes");
const wordViewRoutes = require("./routes/wordViewRoutes");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// mount routes
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(errorHandler);
app.use("/api/auth", authRoutes);
app.use("/api/words", wordRoutes);
app.use("/api/kanji", kanjiRoutes);
app.use("/api/examples", exampleRoutes);
app.use("/api/part-of-speech", partOfSpeechRoutes);
app.use("/api/saved-words", savedWordRoutes);
app.use("/api/word-views", wordViewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

