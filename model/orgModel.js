const mongoose = require('mongoose');
const Joi = require('joi');

const orgSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: String,
  city: String,
  region: String,
  zipcode: String,
  orgName: String,
  orgAddress: String,
  orgPhoto: String,
  orgNumber: Number,
  repName: String,
  orgDescriptions: String,
  totalPost: Number,
  totalDonors: Number,
});

const Orgs = mongoose.model('account', orgSchema);

module.exports = Orgs;
