const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: String,
  city: String,
  orgName: String,
  orgAddress: String,
  orgPhoto: String,
  orgNumber: Number,
  repName: String,
  repId: String,
  orgDocuments: [],
  orgDescriptions: String,
  totalPost: Number,
  totalDonors: Number,
  accountStatus: String,
});

const Request = mongoose.model('accounts', requestSchema);

module.exports = Request;
