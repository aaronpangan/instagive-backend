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




//  View all updates
router.post('/getall/:postId/',  [ verifyToken],
viewAllUpdate )





// Create Update
router.post(
  '/:postId', 

  upload.array('imageList'),[ verifyToken] ,

  addupdates
  );

// Delete Update must pass the Id of the Uodate
router.delete('/:postId/:updateId', [ verifyToken],
deleteUpdates);




// view update
router.get('/:postId/:updateId', [verifyToken],
viewUpdate )








module.exports = router;
