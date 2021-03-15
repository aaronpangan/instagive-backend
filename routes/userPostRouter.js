const express = require('express');
const {
  getUserPost,
  getDetailPost,
  createPost,
  deletePost,
  editText,
  editProfilePic,
  addRefPic,
  deleteRefPic,
} = require('../controller/userPostController');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');
const upload = require('../middleware/postMulter');

// VERIFY JWT IN ALL THESE ROUTES


router.post('/userpost', [verifyToken], getUserPost);





router.get('/userpost/:postId', [verifyToken], getDetailPost);









// Creating a post
router.post(
  '/createpost',
  [upload.fields([{ name: 'profilePic' }, { name: 'imageList' }]) ,verifyToken,],
 (createPost)
);
// Delete full post
router.delete('deletepost/:postId', [verifyToken], deletePost);









// Edit title/description
router.put('/edit/:postId', [verifyToken], editText);










// // Edit post main picture / Can't be empty
// router.put(
//   '/editprofilepic/:postId',
//   [verifyToken],

//   upload.single('imagePost'),
//   editProfilePic
// );

// // Add reference picture (Carousel)
// router.post(
//   '/addrefpic/:postId',
//   [verifyToken],
//   upload.array('imageList'),
//   addRefPic
// );

// // Delete a reference picture
// router.put('/deleterefpic/:postId/:picId', [verifyToken], deleteRefPic);

module.exports = router;
