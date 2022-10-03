require("dotenv").config();
var colors = require("colors");
const mongoose = require("mongoose");
const ports = process.env.PORT || 5000;
var app = require("./app");
// database connect
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection is successful".red.bold);
  });

var server = app.listen(ports, () =>
  console.log(`Server running on port ${ports} 🔥`)
);

process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  server.close(() => {
    process.exit(1);
  });
});
