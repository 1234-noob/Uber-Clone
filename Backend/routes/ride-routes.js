const express = require("express");
const { authUser, authCaptain } = require("../middlewares/auth-middleware");
const { body, query } = require("express-validator");
const {
  createARide,
  getRideFare,
  confirmRide,
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
  body("rideId").isMongoId().withMessage("Invalid ride id"),
  authCaptain,
  confirmRide
);

module.exports = router;
