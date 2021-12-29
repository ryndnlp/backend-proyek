const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");

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

app.use("/auth", authRoutes);
app.use("/order", orderRoutes);

// app.use(express.static(path.join(__dirname, "/build"))); // Serve the static files from the React app
// app.get("/*", function (req, res) {
//   //Handle routing server side
//   res.sendFile(path.join(__dirname, "/build/index.html"));
// });
