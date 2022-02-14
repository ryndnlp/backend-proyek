const express = require("express");
const app = express();

const orderRoutes = require("./orderRoutes");
const dailyReportRoutes = require("./dailyReportRoutes");
const notificationRoutes = require("./notificationRoutes");

app.use("/order", orderRoutes);
app.use("/dailyReport", dailyReportRoutes);
app.use("/notification", notificationRoutes);

module.exports = app;
