const mongoose = require('mongoose');
const Joi = require('joi');

const donateSchema = new mongoose.Schema({
  PostId: mongoose.ObjectId,
  dateDonated: Date,
  certrificate: String,
  name: String,
  amount: Number,
  message: String,
  email: String
});

const Donate = mongoose.model('donate', donateSchema);

module.exports = Donate;
