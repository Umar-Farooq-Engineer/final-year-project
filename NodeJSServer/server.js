import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import historyRoutes from "./routes/history.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/fyp-db";

app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true,
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/history", historyRoutes);

app.get("/", (req, res) => {
  res.send("FYP NodeJS auth server is running.");
});

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB at", mongoUri);
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  });
