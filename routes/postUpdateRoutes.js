const express = require('express');
const {
  addupdates,
  deleteUpdates,
  viewUpdate,
  viewAllUpdate
} = require('../controller/postUpdateController');
const router = express.Router();
const upload = require('../middleware/postMulter');


const  verifyToken  = require('../middleware/verifyToken');



// Create Update
router.post(
  '/:postId', [ verifyToken],

  upload.array('imageList'),

  addupdates
);

// Delete Update must pass the Id of the Uodate
router.delete('/:postId/:updateId', [ verifyToken],
deleteUpdates);

//  View all updates
router.post('/getall/:postId/',  [ verifyToken],
viewAllUpdate )


// view update
router.get('/:postId/:updateId', [verifyToken],
viewUpdate )








module.exports = router;
