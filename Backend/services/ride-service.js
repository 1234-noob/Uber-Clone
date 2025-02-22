const rideModel = require("../models/ride");
const { getDistanceTime } = require("../services/maps-service");
const otpGenerator = require("otp-generator");
const getFare = async (pickup, destination) => {
  if (!pickup || !destination) {
    throw new Error("Pickup and Destination are required");
  }

  const distanceTime = await getDistanceTime(pickup, destination);
  const distance = distanceTime.distance / 1000;
  const time = distanceTime.distance / 60;
  const baseFare = {
    motorcycle: 30, // base fare for motorcycle
    car: 50, // base fare for car
    auto: 40, // base fare for auto
  };

  const farePerKm = {
    motorcycle: 5,
    car: 10,
    auto: 7,
  };

  const farePerMinute = {
    motorcycle: 0.2,
    car: 0.5,
    auto: 0.3,
  };

  const vehicleFare = {
    motorcycle: Math.floor(
      baseFare.motorcycle +
        farePerKm.motorcycle * distance +
        farePerMinute.motorcycle * time
    ),
    car: Math.floor(
      baseFare.car + farePerKm.car * distance + farePerMinute.car * time
    ),
    auto: Math.floor(
      baseFare.auto + farePerKm.auto * distance + farePerMinute.auto * time
    ),
  };

  return vehicleFare;
};

const getOtp = (num) => {
  const otp = otpGenerator.generate(num, {
    digits: true,
    specialChars: false,
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
  });

  return otp;
};

const createRide = async ({ user, pickup, destination, vehicleType }) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }
  const fare = await getFare(pickup, destination);

  const ride = rideModel.create({
    user,
    pickup,
    destination,
    otp: getOtp(4),
    fare: fare[vehicleType],
  });

  return ride;
};

module.exports = { createRide };
