require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
    select: false,
    required: true,
    minlength: [8, "Password should be atleast of 8 characters"],
  },
  socketId: {
    type: String,
  },
});

UserSchema.methods.genAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY,{
    expiresIn:"60m",
    algorithm:"HS256"
  });
  return token;
};

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = async function (password) {
  const genSalt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, genSalt);
};

const userModel = mongoose.model("user", UserSchema);

module.exports = userModel;
