require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const CaptainSchema = new mongoose.Schema({
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
      minlength: [3, "last name must be 3 characters or long"],
      maxlength: [100, "last name exceeds the characters limit!!"],
    },
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Please fill a valid email address",
    ],
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
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "Color must be 3 characters or long"],
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, "Plate must be 3 characters or long"],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be atleast 1"],
    },
    vehicleType: {
      type: String,
      enum: ["car", "bike", "auto"],
      required: true,
    },
  },
  location: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
});

CaptainSchema.methods.genAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "24h",
    algorithm: "HS256",
  });
  return token;
};

CaptainSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

CaptainSchema.statics.hashPassword = async function (password) {
  const genSalt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, genSalt);
};

module.exports = mongoose.model("captain", CaptainSchema);
