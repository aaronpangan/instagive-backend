const express = require('express');
const router = express.Router();
const {
  login,
 // logout,
  getAllAccounts,
  changeAccountStatus,
  getAllPost,
  getUserLedger,
  userLedger,
  userPost
} = require('../controller/adminController');
const  verifyTokenAdmin  = require('../middleware/verifyTokenAdmin.');



// Admin Login
router.post('/login', login);
// router.post('/logout', logout);
router.get('/getusers',  getAllAccounts);


router.get('/allpost', getAllPost)
router.post('/userpost/:userId', userPost)



// Must past status [approved, pending, rejected]
router.post('/changestatus/:userId/:status',  changeAccountStatus);


router.post('/getuserledger/', getUserLedger)

router.post('/userledger/:userId', userLedger )


module.exports = router;




