require("dotenv").config();
const axios = require("axios");
const captain = require("../models/captain");

const getAddressCoordinate = async (address) => {
  if (!address) {
    throw new Error("Address is required");
  }
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (response.status === 200) {
      const location = response.data.results[0].geometry.location;

      return {
        ltd: location.lat,
        lng: location.lng,
      };
    }
  } catch (error) {
    throw new Error(error);
  }
};

const getDistanceTime = async (origin, destination) => {
  try {
    if (!origin || !destination) {
      throw new Error("Orgin and Destination are required");
    }
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.gomaps.pro/maps/api/directions/json?destination=${encodeURIComponent(
      destination
    )}&origin=${encodeURIComponent(origin)}&key=${apiKey}`;
    const response = await axios.get(url);

    if (response.status === 200) {
      const distance = response.data.routes[0].legs[0].distance.value;
      const duration = response.data.routes[0].legs[0].duration.value;

      return {
        distance: distance,
        duration: duration,
      };
    }
  } catch (error) {
    throw new Error(error);
  }
};

const getAutoComplete = async (input) => {
  try {
    if (!input) {
      throw new Error("Input is required");
    }
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}`;
    const response = await axios.get(url);

    if (response.status === 200) {
      const predictions = response.data.predictions;

      return { predictions };
    }
  } catch (error) {
    throw new Error(error);
  }
};

const getCaptainsInTheRadius = async (ltd, lng, radius) => {
  const captains = await captain.find({
    location: {
      $geoWithin: {
        $centerSphere: [[ltd, lng], radius / 6378],
      },
    },
  });
  return captains;
};

module.exports = {
  getAddressCoordinate,
  getDistanceTime,
  getAutoComplete,
  getCaptainsInTheRadius,
};
