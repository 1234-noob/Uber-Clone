const {
  getAddressCoordinate,
  getDistanceTime,
  getAutoComplete,
} = require("../services/maps-service");
const { validationResult } = require("express-validator");
const getCoordinates = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors) {
      res.status(400).json({
        errors: errors.array(),
      });
    }
    const { address } = req.query;

    const coordinates = await getAddressCoordinate(address);
    res.status(200).json({
      coordinates,
    });
  } catch (error) {
    res.status(404).json({
      message: "Coordinates not found ",
    });
  }
};

const getDistanceAndTime = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors) {
      res.status(400).json({
        errors: errors.array(),
      });
    }

    const { origin, destination } = req.query;
    const distanceTime = await getDistanceTime(origin, destination);
    const { distance, duration } = distanceTime;

    res.status(200).json({
      distance: distance,
      duration: duration,
    });
  } catch (error) {
    res.status(404).json({
      message: "Both Origin and Destination required ",
    });
  }
};

const getAutoCompleteSuggestion = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors) {
      res.status(400).json({
        errors: errors.array(),
      });
    }

    const { input } = req.query;
    const autoCompleteSuggestion = await getAutoComplete(input);
    res.status(200).json({
      autoCompleteSuggestion,
    });
  } catch (error) {
    res.status(404).json({
      message: "Input doesn't match ",
    });
  }
};
module.exports = {
  getCoordinates,
  getDistanceAndTime,
  getAutoCompleteSuggestion,
};
