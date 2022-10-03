const express = require("express");
const multer = require("multer");
const tourController = require("../../controllers/tour.controller");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
router
  .route("/")
  .get(tourController.getAllTour)
  .post(upload.single('testImg'), tourController.addTour);
  


module.exports = router;
