const Node = require("../models/Node");

const saveNodes = async (req, res) => {
  try {
    const { nodes } = req.body;

    if (!Array.isArray(nodes) || nodes.length === 0) {
      return res.status(400).json({ error: "Nodes array is required" });
    }

    await Node.deleteMany({});

    const newNodeList = await Node.insertMany(nodes);

    res.status(201).json(newNodeList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to save nodes" });
  }
};

const getAllNodes = async (req, res) => {
  try {
    const nodes = await Node.find({});
    res.status(201).json(nodes);
  } catch (error) {
    res.status(500).json({ error: "Failed to get all nodes" });
  }
};

module.exports = {
  saveNodes,
  getAllNodes,
};
