const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const routes = require("./routes");

app.disable("etag"); // Disable 301 error
app.use(cors());

const dbUrl =
  "mongodb+srv://admin:k30Jh4nWrlo1rlnV@cluster0.b7v08.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(dbUrl, { dbName: "GemasDatabase" }) // Disable deprecated warning
  .then((res) => {
    const port = process.env.PORT || 3000;
    app.listen(port);
    console.log(`Start listening in ${port}`);
  })
  .catch((err) => {
    console.log(err);
  });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// parse cookie
app.use(cookieParser());

// setup router

app.get("/", async (req, res) => {
  res.status(200).json("Hello World!");
});

app.use(routes);

app.get("*", async (req, res) => {
  res.status(404).json("Error 404");
});
