const express = require("express");
const app = express();

const orderRoutes = require("./orderRoutes");
const voucherRoutes = require("./voucherRoutes");
const notificationRoutes = require("./notificationRoutes");
const configRoutes = require("./configRoutes");
const summaryRoutes = require("./summaryRoutes");
const discussionRoutes = require("./discussionRoutes");

app.use("/order", orderRoutes);
app.use("/voucher", voucherRoutes);
app.use("/notification", notificationRoutes);
app.use("/config", configRoutes);
app.use("/summary", summaryRoutes);
app.use("/discussion", discussionRoutes);

module.exports = app;
