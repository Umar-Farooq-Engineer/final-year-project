import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    prediction: {
      type: String,
      required: true,
      trim: true,
    },
    confidence: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const History = mongoose.model("History", historySchema);
export default History;
