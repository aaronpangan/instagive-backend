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

const {verifyCookie, verifyToken} = require('../middleware/verifyToken');
const upload = require('../middleware/postMulter');

// VERIFY JWT IN ALL THESE ROUTES
router.get('userpost', [verifyCookie, verifyToken], getUserPost);
router.get('userpost/:postId', [verifyCookie, verifyToken], getDetailPost);

// Creating a post
router.post(
  'createpost',
  [verifyCookie, verifyToken],

  [upload.fields([{ name: 'imagePost' }, { name: 'imageList' }])],
  createPost
);
// Delete full post
router.delete('deletepost/:postId', [verifyCookie, verifyToken], deletePost);

// Edit title/description
router.put('edittext/:postId', [verifyCookie, verifyToken], editText);

// Edit post main picture / Can't be empty
router.put(
  'editprofilepic/:postId',
  [verifyCookie, verifyToken],

  upload.single('imagePost'),
  editProfilePic
);

// Add reference picture (Carousel)
router.post(
  'addrefpic/:postId',
  [verifyCookie, verifyToken],
  upload.array('imageList'),
  addRefPic
);

// Delete a reference picture
router.put(
  'deleterefpic/:postId/:picId',
  [verifyCookie, verifyToken],
  deleteRefPic
);

module.exports = router;
