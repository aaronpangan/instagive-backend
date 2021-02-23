const { findById } = require('../model/ledgerModel');
const Ledger = require('../model/ledgerModel');
const Post = require('../model/postModel');
const Request = require('../model/requestModel');

exports.allRecord = async (req, res) => {
  const record = await Ledger.find({
    userId: req.params.userId,
  });

  res.send(record);
};

exports.addRecord = async (req, res) => {
  const userId = req.params.userId;
  const postId = req.params.postId;

  const record = new Ledger({
    userId,
    postId,
    donorName: req.body.donorName,
    email: req.body.email,
    donationType: req.body.donationType,
    paymentAddress: req.body.paymentAddress,
    amount: req.body.amount,
    remarks: req.body.remarks,
    date: req.body.date,
  });

  await record.save();

  // Adding Total Amount and Total Donors in post
  const amount = await Post.findById(postId);

  const pushCurrentAmount = await Post.findByIdAndUpdate(postId, {
    currentAmount: amount.currentAmount + req.body.amount,
    totalDonors: amount.totalDonors + 1,
  });

  await pushCurrentAmount.save();

  // Adding Total Donors in the request account
  const donors = await Request.findById(userId);

  const pushTotalDonors = await Request.findByIdAndUpdate(userId, {
    totalDonors: donors.totalDonors + 1,
  });

  await pushTotalDonors.save();

  res.send(record);
};

exports.deleteRecord = async (req, res) => {
  const record = await Ledger.findByIdAndDelete(req.params.recordId);

  res.send('Delete Success');
};
