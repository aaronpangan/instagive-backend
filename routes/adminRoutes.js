const express = require('express');
const router = express.Router();
const {
  login,
 // logout,
  getAllAccounts,
  changeAccountStatus,
  getAllPost,
} = require('../controller/adminController');
const  verifyTokenAdmin  = require('../middleware/verifyTokenAdmin.');



// Admin Login
router.post('/login', login);
// router.post('/logout', logout);
router.get('/getusers',  getAllAccounts);


router.get('/allpost', getAllPost)



// Must past status [approved, pending, rejected]
router.post('/changestatus/:userId/:status',  changeAccountStatus);

module.exports = router;




