const Tour = require("../models/Tour");

exports.addTourService = async (data) => {
  const tour = await new Tour(data);
  console.log(tour)
  tour.save();
};

exports.getAllTourService = async (data) => {
  const tour = await Tour.find({});
  return tour;
};
