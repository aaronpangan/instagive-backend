const express = require('express');
const {
  addupdates,
  deleteUpdates,
} = require('../controller/postUpdateController');
const router = express.Router();
const upload = require('../middleware/postMulter');

router.post(
  '/:postId',
  upload.array('imageList'),

  addupdates
);

router.delete('/:postId', deleteUpdates);

module.exports = router;
