const { createRide } = require("../services/ride-service");
const { validationResult } = require("express-validator");

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
    return res.status(201).json({
      ride,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = { createARide };
