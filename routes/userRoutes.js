const express = require('express');
const router = express.Router();
const {
  requestAccount,
  login,
  logout,
  changePassword,
  forgotPassword,
} = require('../controller/userController');

const verifyToken  = require('../middleware/verifyToken');

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
//router.post('/logout', [ verifyToken], logout);

router.post('/changepassword', [ verifyToken], changePassword);
router.post('/forgotPassword', forgotPassword);

module.exports = router;
