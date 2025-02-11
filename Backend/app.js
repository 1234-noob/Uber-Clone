require("dotenv").config;
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user-routes");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use("/users",userRoutes);

module.exports = app;
