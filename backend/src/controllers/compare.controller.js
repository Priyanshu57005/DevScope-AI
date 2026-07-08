const asyncHandler = require("../middleware/asynchHandler");
const ApiResponse = require("../utils/apiResponse");
const compareService = require("../services/compare.service");
const { validateCompareInput } = require("../validators/compare.validator");

const compareDevelopers = asyncHandler(async (req, res) => {
  const { developerA, developerB } = req.body;

  const validation = validateCompareInput(developerA, developerB);
  if (!validation.valid) {
    return res.status(400).json(
      new ApiResponse(400, null, validation.error)
    );
  }

  try {
    const comparisonData = await compareService.compareDevelopers(
      validation.developerA,
      validation.developerB
    );
    
    res.status(200).json(
      new ApiResponse(200, comparisonData, "Developers compared successfully")
    );
  } catch (error) {
    res.status(500).json(
      new ApiResponse(500, null, `Failed to compare developers: ${error.message}`)
    );
  }
});

module.exports = {
  compareDevelopers
};