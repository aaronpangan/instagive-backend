const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  User: mongoose.ObjectId,
  Title: String,
  datePosted: Date,
  profilePic: String,
  imageList: [],
  description: String,
  totalAmount: Number,
  currentAmount: Number,
  location: String,
  totalDonors: Number,
  totalUpdates: Number,
  donationType: String,
  itemQuantity: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: 'Pending',
  },
});

const Post = mongoose.model('post', postSchema);

module.exports = Post;
