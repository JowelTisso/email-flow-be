const express = require("express");
const { saveSchedule } = require("../controllers/scheduleController");
const router = express.Router();

router.post("/schedule", saveSchedule);

module.exports = router;
