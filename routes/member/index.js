const express = require("express");
const app = express();

const orderRoutes = require("./orderRoutes");
const voucherRoutes = require("./voucherRoutes");
const notificationRoutes = require("./notificationRoutes");

app.use("/order", orderRoutes);
app.use("/voucher", voucherRoutes);
app.use("/notification", notificationRoutes);

module.exports = app;
