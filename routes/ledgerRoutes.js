const express = require('express');
const {
    allRecord,
    addRecord,
    deleteRecord,
} = require('../controller/ledgerController');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');

// Fetch all records
router.get('/:userId', [verifyToken], allRecord);

// Delete Update must pass the Id of the Uodate
router.post('/:userId/:postId', [verifyToken], addRecord);

//  View all updates
router.delete('/:recordId/', [verifyToken], deleteRecord);

module.exports = router;
