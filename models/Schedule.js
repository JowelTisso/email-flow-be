const mongoose = require("mongoose");

const NodeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  time: {
    type: Date,
    required: true,
  },
  subject: {
    type: String,
    require: true,
  },
  body: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Schedule", NodeSchema);
