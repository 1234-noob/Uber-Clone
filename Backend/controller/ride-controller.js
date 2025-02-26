const {
  createRide,
  getFare,
  confirmRides,
} = require("../services/ride-service");
const { validationResult } = require("express-validator");
const { sendMessageToSocketId } = require("../socket");
const rideModel = require("../models/ride");
const {
  getAddressCoordinate,
  getCaptainsInTheRadius,
} = require("../services/maps-service");
const createARide = async (req, res) => {
  const error = validationResult(req);
  if (!error) {
    res.status(400).json({
      error: error.array(),
    });
  }

  const { pickup, destination, vehicleType } = req.body;
  try {
    const ride = await createRide({
      user: req.user._id,
      pickup: pickup,
      destination: destination,
      vehicleType: vehicleType,
    });

    const pickupCoordinates = await getAddressCoordinate(pickup);

    const captainInRadius = await getCaptainsInTheRadius(
      pickupCoordinates.ltd,
      pickupCoordinates.lng,
      2
    );
    ride.otp = "";

    captainInRadius.map(async (captain) => {
      sendMessageToSocketId(captain.socketId, {
        event: "newride",
        data: await rideModel.findOne({ _id: ride._id }).populate("user"),
      });
    });

    return res.status(201).json({
      ride,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const getRideFare = async (req, res) => {
  const error = validationResult(req);
  if (!error) {
    res.status(400).json({
      error: error.array(),
    });
  }
  const { pickup, drop } = req.query;

  try {
    const fare = await getFare(pickup, drop);

    return res.status(200).json({
      fare,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const confirmRide = async (req, res) => {
  const error = validationResult(req);
  if (!error) {
    res.status(400).json({
      error: error.array(),
    });
  }

  const { rideId } = req.body;

  try {
    const ride = await confirmRides({ _id: rideId });

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });
    return res.status(200).json({
      ride,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { createARide, getRideFare, confirmRide };
