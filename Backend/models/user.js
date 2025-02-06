const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be 3 characters or long"],
      maxlength: [100, "First name exceeds the characters limit!!"],
    },
    lastname: {
      type: String,
      required: true,
      minlength: [3, "Last name must be 3 characters or long"],
      maxlength: [100, "Last name exceeds the characters limit!!"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Email must be 3 characters or long"],
    maxlength: [150, "Email exceeds the characters limit!!"],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password should be atleast of 8 characters"],
  },
  socketId: {
    type: String,
  },
});
