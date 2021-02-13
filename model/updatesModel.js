const mongoose = require('mongoose');
const Joi = require('joi');

const updatesSchema = new mongoose.Schema({
  PostId: mongoose.ObjectId,
  datePosted: Date,
  imageList: [],
  description: String,
});

const Updates = mongoose.model('updates', updatesSchema);

module.exports = Updates;
