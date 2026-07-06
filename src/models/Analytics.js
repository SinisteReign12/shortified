import mongoose from "mongoose";

const AnalyticsSchema = new mongoose.Schema({
  shortCode: String,

  browser: String,

  clickedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Analytics ||
  mongoose.model("Analytics", AnalyticsSchema);