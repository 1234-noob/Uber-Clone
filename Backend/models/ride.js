const mongoose = require("mongoose");
const captain = require("./captain");
const user = require("../models/user");

const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "captain",
  },
  pickup: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Completed", "Cancelled", "Ongoing"],
    default: "Pending",
  },
  duration: {
    type: Number, // in seconds
  },
  distance: {
    type: Number, //in meter
  },

  //below 3 needed to verify a particular payment
  paymentId: {
    type: String,
  },
  orderId: {
    type: String,
  },
  signature: {
    type: String,
  },
  otp: {
    type: Number,
    select: false,
    required: true,
  },
});

module.exports = mongoose.model("ride", rideSchema);
