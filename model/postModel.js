const mongoose = require('mongoose');
const Joi = require('joi');

const postSchema = new mongoose.Schema({
  User: mongoose.ObjectId,
  Title: String,
  datePosted: Date,
  profilePic: String,
  imageList: [],
  description: String,
  totalAmount: Number,
  currentAmount: Number,
  totalDonors: Number
});

const Post = mongoose.model('post', postSchema);

module.exports = Post;
