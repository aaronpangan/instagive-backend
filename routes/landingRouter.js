const express = require('express');
const router = express.Router();
const {landingPage, viewPost, viewUpdate} = require('../controller/landingController');













// get all post for landing page
router.get('/', landingPage);



// You will also get the update here
//when selecting a post
router.get('/:postId', viewPost);













module.exports = router;
