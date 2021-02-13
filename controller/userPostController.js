const Post = require('../model/postModel');
const fs = require('fs');
const Orgs = require('../model/orgModel');
const { findById, findByIdAndDelete } = require('../model/postModel');

// DECODE JWT FIRST FOR THE USER ID

// Get all post from the user
exports.getUserPost = async (req, res) => {
  const userPost = await Post.find({
    // req.user or below
    User: req.user.id,
  });

  res.send(userPost);
};

// View full post upon clicking
exports.getDetailPost = async (req, res) => {
  const post = await findById(req.params.postId);

  res.send(post);
};

exports.createPost = async (req, res) => {
  // req.user or below

  const id = req.user.id;
  let imageList = [];
  if (req.files['imageList']) {
    req.files['imageList'].forEach((name) => imageList.push(name.filename));
  }

  const post = new Post({
    User: id,
    Title: req.body.title,
    datePosted: Date.now(),
    profilePic: req.files['imagePost'][0].filename,
    imageList: imageList,
    description: req.body.description,
    totalAmount: req.body.totalAmount,
    currentAmount: 0,
    totalDonors: 0,
  });

  await post.save();
  console.log(post);

  res.send(post)
};

exports.deletePost = async (req, res) => {

    const post = await findByIdAndDelete(req.params.postId);

    // Not sure to save after deleting
    await post.save();

    res.send('Deleted Successfully')



};

// Edit post title or description / Can't be empty
exports.editText = async (req, res) => {

   

    const post = await Post.findByIdAndUpdate(
        req.params.postId,
      {
        Title: req.body.title,
        description: req.body.description,
      },
      { new: true }
    );
  
    await post.save();
  
    console.log(post);
  
  res.send(post)

};

// Edit the post profile picture / Can't be empty
exports.editProfilePic = async (req, res) => {



    const post = await Post.findByIdAndUpdate(
        req.params.postId,
      {
        profilePic: req.file.filename,
      },
      { new: true }
    );
  
    await post.save();
  
    console.log(post.profilePic);
  

    // Deleting the photo from the directory
    // You need the old image name from the frontend
    try {
      fs.unlinkSync(
        `${path.dirname(require.main.filename)}/public/${req.body.oldimagePost}`
      );
      console.log('Success');
    } catch (err) {
      console.error(err);
    }
  
   res.send(post)


};



// Add the new photo in array
exports.addRefPic = async (req, res) => {



    let imageList = [];
    req.files.forEach((name) => imageList.push(name.filename));
  
    const post = await Post.findByIdAndUpdate(
        req.params.postId,
      {
        $push: { imageList: imageList },
      },
      { new: true }
    );
  
    await post.save();
  
    console.log(post.imageList);
  
    res.send(post);


};



// Pull the selected photo from the array
exports.deleteRefPic = async (req, res) => {


    const postId = req.params.postId;
    const imageName = req.params.imageName;
  
   
//    You need the image name of the photo from the frontend
    const post = await Post.findByIdAndUpdate(
        req.params.postId,
      {
        $pull: { imageList: req.params.imageName },
      },
      { new: true }
    );
  
    await post.save();
  

    // Delete the photo from the directory
    try {
      fs.unlinkSync(`${path.dirname(require.main.filename)}/public/${imageName}`);
      console.log('Success');
    } catch (err) {
      console.error(err);
    }
  
   res.send('Picture Deleted Successfully')

    
};
