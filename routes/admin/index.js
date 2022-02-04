const express = require("express");
const app = express();

const orderRoutes = require("./orderRoutes");
const userRoutes = require("./userRoutes");
const voucherRoutes = require("./voucherRoutes");

app.use("/order", orderRoutes);
app.use("/user", userRoutes);
app.use("/voucher", voucherRoutes);

module.exports = app;
