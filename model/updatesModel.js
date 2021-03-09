const mongoose = require('mongoose');

const updatesSchema = new mongoose.Schema({
  PostId: mongoose.ObjectId,
  datePosted: {
    type: Date,
     default: Date.now


  },
  imageList: [],
  description: String,
});

const Updates = mongoose.model('updates', updatesSchema);

module.exports = Updates;
