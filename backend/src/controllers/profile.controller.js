const mongoose = require("mongoose");
const asyncHandler = require("../middleware/asynchHandler");
const ApiResponse = require("../utils/apiResponse");
const profileService = require("../services/profile.service");
const { validateUsername } = require("../validators/profile.validator");
const SearchHistory = require("../models/searchHistory.model");



const getProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;

  // Validate username
  const validation = validateUsername(username);
  if (!validation.valid) {
    return res.status(400).json(
      new ApiResponse(400, null, validation.error)
    );
  }

  try {
    // Fetch profile data
    const profileData = await profileService.getProfile(validation.username);

    // Track search history (async, no need to wait)
    trackSearch(validation.username, req);

    // Send response
    const response = new ApiResponse(
      200,
      profileData,
      "Profile fetched successfully"
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(
      new ApiResponse(500, null, `Failed to fetch profile: ${error.message}`)
    );
  }
});

//track search history
const trackSearch = async (username, req) => {
  try {
    if (!process.env.MONGODB_URI || mongoose.connection?.readyState !== 1) return;

    await SearchHistory.findOneAndUpdate(
      { username: username.toLowerCase() },
      {
        $inc: { searchCount: 1 },
        $set: { lastSearched: new Date() },
        $push: {
          searchHistory: {
            timestamp: new Date(),
            ipAddress: req.ip,
            userAgent: req.get("user-agent"),
          },
        },
      },
      { upsert: true, new: true }
    );
  } catch (error) {
    console.warn("Search tracking failed:", error.message);
  }
};

module.exports = {
    getProfile,
};