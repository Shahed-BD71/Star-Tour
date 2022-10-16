const express = require("express");
const multer = require("multer");
const tourController = require("../../controllers/tour.controller");
const upload = require("../../middleware/upload");
const router = express.Router();
router
  .route("/")
  .get(tourController.getAllTour)
  .post(upload.single('testImg'), tourController.addTour);
  


module.exports = router;
