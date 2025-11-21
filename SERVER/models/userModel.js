const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required:true
  },
  email: {
    type: String,
    unique: true,
    required:true
  },
  password: {
    type: String,
    required:true
  },

  createdOn: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const users = mongoose.model("users", userSchema);
module.exports = users;
