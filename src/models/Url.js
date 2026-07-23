import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },

  shortCode: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },

  customAlias: {
    type: String,
    default: null,
    index: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true,
  },

  clicks: {
    type: Number,
    default: 0,
  },

  expiresAt: {
    type: Date,
    default: null,
    index: true,
  },
});

export default mongoose.models.Url ||
  mongoose.model("Url", UrlSchema);