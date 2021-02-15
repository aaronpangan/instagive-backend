const express = require('express');
const {
  addupdates,
  deleteUpdates,
  viewUpdate,
  viewAllUpdate
} = require('../controller/postUpdateController');
const router = express.Router();
const upload = require('../middleware/postMulter');


const {verifyCookie, verifyToken} = require('../middleware/verifyToken');



// Create Update
router.post(
  '/:postId', [verifyCookie, verifyToken],

  upload.array('imageList'),

  addupdates
);

// Delete Update must pass the Id of the Uodate
router.delete('/:postId/:updateId', [verifyCookie, verifyToken],
deleteUpdates);

//  View all updates
router.get('/:postId/',  [verifyCookie, verifyToken],
viewAllUpdate )


// view update
router.get('/:postId/:updateId', [verifyCookie, verifyToken],
viewUpdate )








module.exports = router;
