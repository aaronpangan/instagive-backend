const mongoose = require('mongoose');

const ledgerSchema = new mongoose.Schema({
  userId: mongoose.ObjectId,
  postId: mongoose.ObjectId,
  donorName: String,
  email: String,
  donationType: String,
  paymentAddress: String,
  amount: Number,
  remarks: String,
  date: String,
});

const Ledger = mongoose.model('ledger', ledgerSchema);

module.exports = Ledger;
