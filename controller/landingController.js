const Post = require('../model/postModel');
const Updates = require('../model/updatesModel');

// Landing Page
exports.landingPage = async (req, res) => {
  const post = await Post.find();

  res.send(post);
};

// View Post after clicking, Needs post id as url paramteter, will also get the updates of that post
exports.viewPost = async (req, res) => {
  const postid = req.params.postId;

  const post = await Post.findById(postid);
  

  const update = await Updates.find({
    PostId: postid,
  });
  res.send({
    post,
    update,
  });
};
