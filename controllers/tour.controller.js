const Service = require("../services/tour.services");
var fs = require("fs");

exports.fileUpload = async (req, res, next) => {
  try {
    res.status(200).json({
      status: "success",
      message: "file uploaded Successfully",
    });
  } catch (error) {
    console.log(error),
      res.status(400).json({
        status: "fail",
        error: error.message,
      });
  }
  next();
};

exports.addTour = (req, res, next) => {
  try {
    fs.readFile(req.file.path, function (err, data) {
      var base64data = Buffer.from(data).toString("base64");
      const tourData = { ...req?.body, img: base64data };
      Service.addTourService(tourData);
    });
    res.status(200).json({
      status: "success",
      message: "Tour Saved Successfully",
    });
  } catch (error) {
    console.log(error),
      res.status(400).json({
        status: "fail",
        error: error.message,
      });
  }
};

exports.getAllTour = async (req, res, next) => {
  try {
    tours = await Service.getAllTourService();
    // result.logger(); //injecting this logger function manually before.
    res.status(200).json({
      status: "success",
      data: tours,
    });
  } catch (error) {
    console.log(error),
      res.status(400).json({
        status: "fail",
        error: error.message,
      });
  }
};
