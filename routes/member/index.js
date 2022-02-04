const express = require("express");
const app = express();

const orderRoutes = require("./orderRoutes");
const voucherRoutes = require("./voucherRoutes");

app.use("/order", orderRoutes);
app.use("/voucher", voucherRoutes);

module.exports = app;
