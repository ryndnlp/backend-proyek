const express = require("express");
const app = express();

const orderRoutes = require("./orderRoutes");
const userRoutes = require("./userRoutes");

app.use("/order", orderRoutes);
app.use("/user", userRoutes);

module.exports = app;