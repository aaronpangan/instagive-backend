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

const { verifyCookie, verifyToken } = require('../middleware/verifyToken');
const upload = require('../middleware/postMulter');

// VERIFY JWT IN ALL THESE ROUTES

router.get('userpost', getUserPost);
router.get('userpost/:postId', getDetailPost);

// Creating a post
router.post(
  'createpost',
  [upload.fields([{ name: 'imagePost' }, { name: 'imageList' }])],
  createPost
);
// Delete full post
router.delete('deletepost/:postId', deletePost);

// Edit title/description
router.put('edittext/:postId', editText);

// Edit post main picture / Can't be empty
router.put(
  'editprofilepic/:postId',
  upload.single('imagePost'),
  editProfilePic
);

// Add reference picture (Carousel)
router.post('addrefpic/:postId', upload.array('imageList'), addRefPic);

// Delete a reference picture
router.put('deleterefpic/:postId/:picId', deleteRefPic);

module.exports = router;
