let tour_views = {};
const viewCounter = function (req, res, next) {
  let counter = tour_views[req.originalUrl];
  if (counter || counter === 0) {
    tour_views[req.originalUrl] = counter + 1;
  } else {
    tour_views[req.originalUrl] = 1;
  }
  console.log(req.originalUrl, counter);
  next();
};

module.exports = viewCounter;



