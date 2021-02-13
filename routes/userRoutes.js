const express = require('express');
const router = express.Router();
const {
  requestAccount,
  login,
  logout,
} = require('../controller/userController');






const upload = require('../middleware/requestAccountMulter');

// Register account with multer
router.post(
  '/register',
  upload.fields([
    { name: 'orgPhoto' },
    { name: 'repId' },
    { name: 'orgDocuments' },
  ]),
  requestAccount
);

// For user login

router.post('/login', login);
router.post('/logout', logout);












module.exports = router;
