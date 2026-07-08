const asyncHandler = require("../middleware/asynchHandler");
const ApiResponse = require("../utils/apiResponse");
const activityService = require("../services/activity.service");
const { validateUsername } = require("../validators/profile.validator");

const getActivityAnalysis = asyncHandler(async (req, res) => {
  const { username } = req.params;

  const validation = validateUsername(username);
  if (!validation.valid) {
    return res.status(400).json(
      new ApiResponse(400, null, validation.error)
    );
  }

  try {
    const activityData = await activityService.getActivityAnalysis(validation.username);
    res.status(200).json(new ApiResponse(200, activityData, "Activity analyzed successfully"));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, null, `Failed to fetch activity: ${error.message}`));
  }
});

module.exports = {
  getActivityAnalysis
};