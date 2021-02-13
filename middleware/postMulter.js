const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public');
  },
  filename: (req, file, cb) => {
    cb(
      null,

      file.fieldname +
        '-' +
        mongoose.Types.ObjectId() +
        path.extname(file.originalname)
    );
  },
});

module.exports = upload = multer({
  storage: storage,
});
