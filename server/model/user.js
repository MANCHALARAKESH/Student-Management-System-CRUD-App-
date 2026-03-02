const mongoose = require("mongoose");

const userDetails = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"]
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userDetails);
