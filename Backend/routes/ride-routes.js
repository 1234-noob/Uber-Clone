const express = require("express");
const { authUser, authCaptain } = require("../middlewares/auth-middleware");
const { body, query } = require("express-validator");
const {
  createARide,
  getRideFare,
  confirmRide,
  startRide,
  endRide,
} = require("../controller/ride-controller");
const router = express.Router();

router.post(
  "/create",
  [
    body("pickup")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Invalid pickup address"),
    body("destination")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Invalid destination address"),
    body("vehicleType")
      .isString()
      .isIn(["motorcycle", "car", "auto"])
      .withMessage("Invalid vehicle type"),
  ],
  authUser,
  createARide
);

router.get(
  "/getfare",
  authUser,
  [
    query("pickup")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Invalid pickup address"),
    query("drop")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Invalid destination address"),
  ],
  getRideFare
);

router.post(
  "/confirm",
  [
    body("rideId").isMongoId().withMessage("Invalid ride id"),
    body("captainId").isMongoId().withMessage("Invalid captain id"),
  ],
  authCaptain,
  confirmRide
);

router.get(
  "/start-ride",
  [
    query("rideId").isMongoId().withMessage("Invalid ride id"),
    query("otp")
      .isInt()
      .isLength({ min: 4, max: 4 })
      .withMessage("Invalid OTP"),
  ],
  authCaptain,
  startRide
);

router.post(
  "/end-ride",
  [body("rideId").isMongoId().withMessage("Invalid ride id")],
  authCaptain,
  endRide
);

module.exports = router;
