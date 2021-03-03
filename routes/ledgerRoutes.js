const express = require('express');
const {
    allRecord,
    addRecord,
    deleteRecord,
} = require('../controller/ledgerController');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');

// Fetch all records
router.post('/getall', [verifyToken], allRecord);

// Add Record
router.post('/:postId', [verifyToken], addRecord);



// Delete a record
router.delete('/:recordId/', [verifyToken], deleteRecord);

module.exports = router;
