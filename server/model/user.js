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
  },
  role:{
    type:String,
    required:true,
    enum:["admin","student"],
    default:"student"
  },

  password:{
    type:String,
    required:true
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userDetails);
