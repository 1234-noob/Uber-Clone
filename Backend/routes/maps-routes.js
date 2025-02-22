const express = require("express");
const router = express.Router();
const { authUser } = require("../middlewares/auth-middleware");
const {
  getCoordinates,
  getDistanceAndTime,
  getAutoCompleteSuggestion,
} = require("../controller/map-controller");
const { query } = require("express-validator");

router.get(
  "/getcoordinates",
  query("address").isString().isLength({ min: 3 }),
  authUser,
  getCoordinates
);

router.get("/getdistancetime", [
  query("origin").isString().isLength({ min: 3 }),
  query("destination").isString().isLength({ min: 3 }),
  authUser,
  getDistanceAndTime,
]);

router.get(
  "/getsuggestions",
  query("input").isString().isLength({ min: 3 }),
  authUser,
  getAutoCompleteSuggestion
);

module.exports = router;
