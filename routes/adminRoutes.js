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
  userPost,
  changePostStatus,
  changeLedgerStatus
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


router.get('/changepoststatus/:postId/:status', changePostStatus)


router.post('/changeledgerstatus/:ledgerId/:status', changeLedgerStatus)






module.exports = router;




