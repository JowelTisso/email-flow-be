const mongoose = require("mongoose");

const NodeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  position: { x: Number, y: Number },
  data: {
    label: String,
    followUp: String,
    icBg: String,
    icBorder: String,
    icColor: String,
    waitTime: String,
    waitType: String,
    emails: [String],
    value: {
      body: String,
      name: String,
      offer: String,
      subject: String,
    },
  },
  draggable: {
    type: Boolean,
    required: false,
  },
});

module.exports = mongoose.model("Node", NodeSchema);
