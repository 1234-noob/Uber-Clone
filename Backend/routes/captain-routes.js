const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  registerCaptain,
  loginCaptain,
  getCaptainProfile,
  logoutCaptain,
} = require("../controller/captain-controller");
const { authCaptain } = require("../middlewares/auth-middleware");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("fullname.firstname")
      .isLength({
        min: 3,
      })
      .withMessage("First name must be 3 characters long"),
    body("fullname.lastname")
      .isLength({
        min: 3,
      })
      .withMessage("last name must be 3 characters long"),
    body("password")
      .isLength({
        min: 8,
      })
      .withMessage("Password must be 8 characters long"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color must be 3 characters long"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Plate must be 3 characters long"),
    body("vehicle.model")
      .isLength({ min: 3 })
      .withMessage("Model must be 3 characters long"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Capacity must be atleast 1"),
    body("vehicle.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Invalid vehicle type"),
  ],
  registerCaptain
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({
        min: 8,
      })
      .withMessage("Password must be 8 characters long"),
  ],
  loginCaptain
);

router.get("/profile", authCaptain, getCaptainProfile);

router.get("/logout", authCaptain, logoutCaptain);
module.exports = router;
