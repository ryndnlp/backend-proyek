const express = require("express");
const app = express();

const orderRoutes = require("./orderRoutes");
const userRoutes = require("./userRoutes");
const voucherRoutes = require("./voucherRoutes");
const configRoutes = require("./configRoutes");
const summaryRoutes = require("./summaryRoutes");

app.use("/order", orderRoutes);
app.use("/user", userRoutes);
app.use("/voucher", voucherRoutes);
app.use("/config", configRoutes);
app.use("/summary", summaryRoutes);

module.exports = app;
