const Tour = require("../models/Tour");

exports.addTourService = async (tourData) => {
  const tour = new Tour(tourData);
  tour.save();
};

exports.getAllTourService = async (data) => {
  const tour = await Tour.find({});
  return tour;
};
