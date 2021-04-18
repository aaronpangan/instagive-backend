const express = require('express');
const {
    allRecord,
    addRecord,
    deleteRecord,
    donateButton,
    changeStatus,
} = require('../controller/ledgerController');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');

// Fetch all records
router.post('/getall', [verifyToken], allRecord);


router.post('/:postId', [verifyToken], ((req, res) => {console.log('hello')}));

router.post('/pending/:postId', [verifyToken], donateButton);

router.post('/:ledgerId/:status', [verifyToken], changeStatus);








// Delete a record
router.delete('/:recordId/', [verifyToken], deleteRecord);

module.exports = router;
