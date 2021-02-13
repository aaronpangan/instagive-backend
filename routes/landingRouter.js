const express = require('express');
const router = express.Router();
const {landingPage, viewPost} = require('../controller/landingController');













// get all post for landing page
router.get('/', landingPage);

//when selecting a post
router.get('/:postId', viewPost);













module.exports = router;
