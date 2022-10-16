const Service = require("../services/tour.services");
var fs = require("fs");

exports.addTour = (req, res, next) => {
  let imgPath =  (req.file.path.slice(7));
  console.log(imgPath)
  const requestBody = {...req.body, img: imgPath}
  console.log(requestBody)
  try {
    Service.addTourService(requestBody);
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
