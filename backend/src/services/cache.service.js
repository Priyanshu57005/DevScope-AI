const CachedProfile = require("../models/cachedProfile.model");
const mongoose = require("mongoose");

const getCachedProfile = async (username) => {
  try {
    // If Mongo is not connected or URI not set, bypass cache
    if (!process.env.MONGODB_URI || mongoose.connection.readyState !== 1) {
      return null;
    }
    return await CachedProfile.findOne({ username: username.toLowerCase() });
  } catch (error) {
    console.warn("Cache read failed:", error.message);
    return null;
  }
};

const cacheProfile = async (username, profile, repositories, events, statistics, aiAnalysis) => {
  try {
    if (!process.env.MONGODB_URI || mongoose.connection.readyState !== 1) {
      return;
    }
    await CachedProfile.findOneAndUpdate(
      { username: username.toLowerCase() },
      {
        profile,
        repositories,
        events,
        statistics,
        aiAnalysis,
        createdAt: new Date(),
      },
      { upsert: true, new: true }
    );
  } catch (error) {
    console.warn("Cache write failed:", error.message);
  }
};

module.exports = {
  getCachedProfile,
  cacheProfile,
};