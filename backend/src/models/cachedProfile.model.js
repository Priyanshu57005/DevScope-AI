const mongoose = require("mongoose");

const CachedProfileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  profile: {
    type: Object,
    required: true,
  },
  repositories: {
    type: Array,
    required: true,
  },
  events: {
    type: Array,
    required: true,
  },
  statistics: {
    type: Object,
    required: true,
  },
  aiAnalysis: {
    type: Object,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600, // Expires after 1 hour (3600 seconds)
  },
});

module.exports = mongoose.model("CachedProfile", CachedProfileSchema);