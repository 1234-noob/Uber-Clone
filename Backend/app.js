require("dotenv").config;
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user-routes");
const captainRoutes = require("./routes/captain-routes");
const mapsRoutes = require("./routes/maps-routes");
const rideRoutes = require("./routes/ride-routes");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST",
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRoutes);
app.use("/captains", captainRoutes);
app.use("/maps", mapsRoutes);
app.use("/rides", rideRoutes);

module.exports = app;
