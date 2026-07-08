const express = require("express");
const router = express.Router();
const { compareDevelopers } = require("../controllers/compare.controller");

router.post("/", compareDevelopers);

module.exports = router;