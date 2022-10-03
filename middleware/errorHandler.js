const errorHandler = (error, req, res, next) => {
  res.status(500);
  res.json(error.message);
};

module.exports = errorHandler;
