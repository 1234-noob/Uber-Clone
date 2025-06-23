const rideModel = require("../models/ride");
const captainModel = require("../models/captain");
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

const getDistance = async (pickup, destination) => {
  if (!pickup || !destination) {
    throw new Error("Pickup and Destination are required");
  }

  const distanceTime = await getDistanceTime(pickup, destination);
  const distance = Math.round((distanceTime.distance / 1000) * 100) / 100;

  return distance;
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
  const distance = await getDistance(pickup, destination);
  const ride = rideModel.create({
    user,
    pickup,
    destination,
    otp: getOtp(4),
    distance,

    fare: fare[vehicleType],
  });

  return ride;
};

const confirmRides = async (rideId, captainId) => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }
  const captain = await captainModel.findById(captainId);

  await rideModel.findOneAndUpdate(
    { _id: rideId },
    { status: "confirmed", captain: captain }
  );
  const ride = await rideModel
    .findOne({ _id: rideId })
    .populate("user")
    .populate("captain")
    .select("+otp");
  if (!ride) {
    throw new Error("Ride not found");
  }
  return ride;
};

const startRiding = async (rideId, otp) => {
  if (!rideId || !otp) {
    throw new Error("Ride id and OTP are required");
  }

  const ride = await rideModel
    .findOne({
      _id: rideId,
    })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "confirmed") {
    throw new Error("Ride not  accepted");
  }

  if (ride.otp != otp) {
    throw new Error("Invalid OTP");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "ongoing",
    }
  );

  return ride;
};

const endRiding = async (rideId, captain) => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }
  if (!captain) {
    throw new Error("Captain is required");
  }

  const ride = await rideModel
    .findOne({
      _id: rideId,
      captain: captain._id,
    })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status == "Ongoing") {
    throw new Error("Ride not ongoing");
  }
  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "complete",
    }
  );
  return ride;
};

module.exports = { createRide, getFare, confirmRides, startRiding, endRiding };
