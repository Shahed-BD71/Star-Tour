var multer = require("multer");
const Tour = require("../models/Tour");

module.exports.files = {
  storage: function () {
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "public/files/");
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    });

    return storage;
  },

  allowedFile: function (req, file, cb) {
    if (
      !file.originalname.match(
        /\.(pdf|doc|txt|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/
      )
    ) {
      req.fileValidationError = "Only  files are allowed!";
      return cb(new Error("Only  files are allowed!"), false);
    }
    cb(null, true);
  },
};

function uploadFile(req, res) {
  var upload = multer({
    storage: fileUpload.files.storage(),
    allowedFile: fileUpload.files.allowedFile,
  }).single("uploads");
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      res.send(err);
    } else if (err) {
      res.send(err);
    } else {
      res.json("uploaded successfully");
    }
  });
}
