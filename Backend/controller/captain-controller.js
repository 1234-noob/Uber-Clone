const blacklistToken = require("../models/blacklistToken");
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
      modul: vehicle.model,
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

const loginCaptain = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error });
    }

    const { email, password } = req.body;

    const captain = await Captain.findOne({ email }).select("+password");
    if (!captain) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const token = captain.genAuthToken();
    res.cookie("token", token);
    return res.status(200).json({
      token,
      captain,
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
};

const getCaptainProfile = async (req, res) => {
  try {
    const captain = await Captain.findById(req.captain._id);
    return res.status(200).json({
      captain,
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
};

const logoutCaptain = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  await blacklistToken.create({
    token,
  });
  res.clearCookie("token");
  return res.status(200).json({
    message: "Logout Successfully",
  });
};

module.exports = {
  registerCaptain,
  loginCaptain,
  getCaptainProfile,
  logoutCaptain,
};
