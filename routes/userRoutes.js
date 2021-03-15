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



//Check if token is valid route 




const Request = require('../model/requestModel')

router.post('/checkusertoken', [verifyToken] , async (req, res) => {


const token = req.user;

const checkUser = await Request.findById(token);

if(!checkUser) res.send({valid: 'The Token is Invalid'})




res.send({valid: true, repName: checkUser.repName})


})












module.exports = router;
