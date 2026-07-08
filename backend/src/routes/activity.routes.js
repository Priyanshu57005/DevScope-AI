const express = require("express");
const router = express.Router();

const {getActivityAnalysis} = require("../controllers/activity.conttroller")


router.get("/:username", getActivityAnalysis)

module.exports = router;