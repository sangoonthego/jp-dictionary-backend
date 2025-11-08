const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const wordRoutes = require("./routes/words");
const examplesRoutes = require("./routes/examples");
const kanjiRoutes = require("./routes/kanji");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/words", wordRoutes);
//app.use("/api/examples", examplesRoutes);
app.use("/api/kanji", kanjiRoutes);

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
