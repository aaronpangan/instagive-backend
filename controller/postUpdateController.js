const Updates = require('../model/updatesModel');
const Post = require('../model/postModel');










// Get all updates of a post
exports.viewAllUpdate = async (req, res) => {
  const update = await Updates.find({
    PostId: req.params.postId,
  }).sort({datePosted: 'desc'});
  console.log('From Update Controller')
  res.send(update);




};

// View single update || user Side





















exports.viewUpdate = async (req, res) => {
  const update = await Updates.findById(req.params.updateId);

  res.send(update);
};







// Add Updates (Org Side) Needs Post ID

exports.addupdates = async (req, res) => {
  const postId = req.params.postId;

  // check if there is image, otherwise return an emptry array
  let imageList = [];
  if (req.files) {
    req.files.forEach((name) => imageList.push(name.filename));
  }

  const updates = await new Updates({
    PostId: postId,
    datePosted: Date.now(),
    imageList: imageList,
    description: req.body.description,
  });

  await updates.save();

  const numberUpdates = await Post.findById(postId);

  const pushUpdate = await Post.findByIdAndUpdate(postId, {
    totalUpdates: numberUpdates.totalUpdates + 1,
  });

  await pushUpdate.save();



  console.log('Update Successfully Added!')


  res.send('Update Added Successfuly');
};

// Delete Update
exports.deleteUpdates = async (req, res) => {
  const updatesId = req.params.updateId;
  const getUpdateData = await Updates.find(updatesId);

  // Decrement total updates
  const getPost = await Post.findById(getUpdateData.PostId);

  const pushTotalPost = await Post.findByIdAndUpdate(getUpdateData.PostId, {
    totalUpdates: getPost.totalUpdates - 1,
  });

  await pushTotalPost.save();

  await Updates.findByIdAndDelete(updatesId);

  res.send('Update Successfuly Deleted');
};

// Shortcut

// async function returnPost(id) {
//   const post = await Post.findById(id);

//   return post;
// }

// async function returnUpdates(id) {
//   const updates = await Updates.find({
//     PostId: id,
//   });

//   return updates;
// }
