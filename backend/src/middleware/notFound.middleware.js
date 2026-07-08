const ApiResponse = require("../utils/apiResponse");

const notFound = (req, res, next) => {
    res.status(404).json(new ApiResponse(404, null, `Route not found: ${req.originalUrl}`));
};

module.exports = notFound;