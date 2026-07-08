const mongoose = require("mongoose");

const SearchHistorySchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  searchCount: {
    type: Number,
    default: 0,
  },
  lastSearched: {
    type: Date,
    default: Date.now,
  },
  searchHistory: [
    {
      timestamp: { type: Date, default: Date.now },
      ipAddress: String,
      userAgent: String,
    },
  ],
});

module.exports = mongoose.model("SearchHistory", SearchHistorySchema);