




const express = require('express');
const router = express.Router();
const {donate, getDonate} = require('../controller/donateController');














// For Donating
router.post('/:postId', donate)
router.post('/getdonate/:postId', getDonate)































module.exports = router;
