const express = require('express');
const router = express.Router();
const {
  requestAccount,
  login,
  logout,
} = require('../controller/userController');

const { verifyCookie, verifyToken } = require('../middleware/verifyToken');

const upload = require('../middleware/requestAccountMulter');

// Register account with multer
router.post(
  '/register',
  [verifyCookie, verifyToken],

  upload.fields([
    { name: 'orgPhoto' },
    { name: 'repId' },
    { name: 'orgDocuments' },
  ]),
  requestAccount
);

// For user login

router.post('/login', login);
router.post('/logout', [verifyCookie, verifyToken], logout);

module.exports = router;
