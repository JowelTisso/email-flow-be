const express = require("express");
const { saveNodes } = require("../controllers/nodeController");
const router = express.Router();

router.post("/node", saveNodes);

module.exports = router;
