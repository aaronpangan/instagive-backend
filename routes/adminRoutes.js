const express = require('express');
const router = express.Router();
const {
  login,
  logout,
  getAllAccounts,
  changeAccountStatus,
} = require('../controller/adminController');

// Admin Login
router.post('/login', login);
router.post('/logout', logout);
router.get('/getusers', getAllAccounts);



// Must past status [approved, pending, rejected]
router.post('/changestatus/:userId/:status', changeAccountStatus);

module.exports = router;




