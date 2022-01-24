const express = require("express");
const app = express();

const orderRoutes = require("./orderRoutes");

app.use("/order", orderRoutes);

module.exports = app;
