const express = require("express");
const app = express();

const orderRoutes = require("./orderRoutes");
const userRoutes = require("./userRoutes");
const voucherRoutes = require("./voucherRoutes");
const configRoutes = require("./configRoutes");
const summaryRoutes = require("./summaryRoutes");
const discussionRoutes = require("./discussionRoutes");
const learningRoutes = require("./learningRoutes");

app.use("/order", orderRoutes);
app.use("/user", userRoutes);
app.use("/voucher", voucherRoutes);
app.use("/config", configRoutes);
app.use("/summary", summaryRoutes);
app.use("/discussion", discussionRoutes);
app.use("/learning", learningRoutes);

module.exports = app;
