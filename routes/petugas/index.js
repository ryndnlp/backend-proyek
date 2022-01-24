const express = require("express");
const app = express();

const orderRoutes = require("./orderRoutes");
const dailyReportRoutes = require("./dailyReportRoutes");

app.use("/order", orderRoutes);
app.use("/dailyReport", dailyReportRoutes);

module.exports = app;
