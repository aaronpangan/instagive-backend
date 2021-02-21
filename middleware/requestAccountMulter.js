const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

// Middleware for multer (Requestaccount)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/docs');
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

const upload = multer({
  storage: storage,
});

module.exports = upload;
