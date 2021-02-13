




const express = require('express');
const router = express.Router();
const {donate} = require('../controller/donateController');














// For Donating
router.post('/:postId', donate)
































module.exports = router;
