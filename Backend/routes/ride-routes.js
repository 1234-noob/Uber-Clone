const express = require("express");
const { authUser } = require("../middlewares/auth-middleware");
const { body } = require("express-validator");
const { createARide } = require("../controller/ride-controller");
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

module.exports = router;
