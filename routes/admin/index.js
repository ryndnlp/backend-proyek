const express = require("express");
const { verifyAdmin } = require("../../utils/verify");
const app = express();

const orderRoutes = require("./orderRoutes");
const userRoutes = require("./userRoutes");

app.use("/order", verifyAdmin, orderRoutes);
app.use("/user", verifyAdmin, userRoutes);

module.exports = app;
