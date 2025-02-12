const Captain = require("../models/captain");
const { createCaptain } = require("../services/captain-service");
const { validationResult } = require("express-validator");
const registerCaptain = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error });
    }
    const { email, fullname, password, vehicle } = req.body;

    const isCaptainAlreadyExist = await Captain.findOne({ email });

    if (isCaptainAlreadyExist) {
      return res.status(400).json({ message: "Captain already exist" });
    }
    const hashPassword = await Captain.hashPassword(password);

    const captain = await createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });

    const token = captain.genAuthToken();
    return res.status(201).json({
      token,
      captain,
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
};

module.exports = { registerCaptain };
