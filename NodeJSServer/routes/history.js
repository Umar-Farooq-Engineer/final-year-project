import express from "express";
import History from "../models/History.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();
router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    const records = await History.find({ user: req.userId }).sort({ createdAt: -1 });
    return res.json(records);
  } catch (error) {
    console.error("Fetch history error:", error);
    return res.status(500).json({ message: "Server error while fetching history." });
  }
});

router.post("/", async (req, res) => {
  const { prediction, confidence, notes } = req.body;
  if (!prediction) {
    return res.status(400).json({ message: "Prediction value is required." });
  }

  try {
    const record = await History.create({
      user: req.userId,
      prediction,
      confidence: typeof confidence === "number" ? confidence : Number(confidence) || 0,
      notes: notes ? String(notes) : "",
    });
    return res.status(201).json(record);
  } catch (error) {
    console.error("Save history error:", error);
    return res.status(500).json({ message: "Server error while saving history." });
  }
});

export default router;
