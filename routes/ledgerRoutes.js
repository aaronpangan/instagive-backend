const express = require('express');
const {
    allRecord,
    addRecord,
    deleteRecord,
    donateButton,
    changeStatus,
    getPostLedger,
} = require('../controller/ledgerController');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');

// Fetch all records
router.post('/getall', [verifyToken], allRecord);

router.get('/getpostrecords/:postId' , getPostLedger )

router.post('/:postId', [verifyToken], addRecord);

router.post('/pending/:postId', [verifyToken], donateButton);

router.post('/:ledgerId/:status', [verifyToken], changeStatus);








// Delete a record
router.delete('/:recordId/', [verifyToken], deleteRecord);

module.exports = router;
