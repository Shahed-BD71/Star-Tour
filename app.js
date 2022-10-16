const express = require("express");
const app = express();
const cors = require("cors");
var bodyParser = require("body-parser");
// let ejs = require("ejs");
const errorHandler = require("./middleware/errorHandler.js");
const path = require("path");

const tourRoutes = require("./routes/v1/tour.route.js");


// middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static("public"))
// app.use(express.static("views"));
// app.set("view engine", ejs);
app.use(errorHandler);

// Routes
app.use("/api/v1/tour", tourRoutes);
// server build
// if (process.env?.NODE_ENV === "production") {
//   app.use(express.static("client/dist"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
//   });
// }

app.use(express.static("client"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

app.all("*", (req, res, next) => {
  res.send("No Route Found".bgYellow);
});

module.exports = app;
