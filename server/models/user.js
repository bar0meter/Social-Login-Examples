const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    _id: String,
    name: String,
    email: Array,
    profileUrl: String,
    profilePic: String
  })
);

module.exports = User;
