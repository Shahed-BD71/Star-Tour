const express = require("express");
const app = express();
const cors = require("cors");
// let ejs = require("ejs");
const errorHandler = require("./middleware/errorHandler.js");
const mongoose = require("mongoose");
const fs = require("fs");
const multer = require("multer");
const tourRoutes = require("./routes/v1/tour.route.js");
const Tour = require("./models/Tour");

// middleware
app.use(express.json());
app.use(cors());
// app.use(express.static("public"))
// app.use(express.static("views"));
// app.set("view engine", ejs);
app.use(errorHandler);

// Routes
app.use("/api/v1/tour", tourRoutes);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// will clear later..........
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("testImg"), (req, res) => {
  const saveImage = Tour(
    { ...req.body },
    {
      image: {
        data: fs.readFileSync("uploads/" + req.file.filename),
        contentType: "image/jpeg",
      },
    }
  );
  saveImage
    .save()
    .then((res) => {
      console.log("image is saved");
    })
    .catch((err) => {
      console.log(err, "error has occur");
    });
  res.send(req.file);
});

app.all("*", (req, res, next) => {
  res.send("No Route Found".bgYellow);
});

module.exports = app;
