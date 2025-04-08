const express = require("express");
const { saveNodes, getAllNodes } = require("../controllers/nodeController");
const router = express.Router();

router.post("/node", saveNodes);
router.get("/nodes", getAllNodes);

module.exports = router;
