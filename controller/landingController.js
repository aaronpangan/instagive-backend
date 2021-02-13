const Post = require('../model/postModel');

// Landing Page
exports.landingPage = async (req, res) => {
  const post = await Post.find();

  res.send(post);
};




// View Post after clicking, Needs post id as url paramteter
exports.viewPost = async (req, res) => {
  const post = await Post.findById(req.params.postId);

  res.send(post);
};
































