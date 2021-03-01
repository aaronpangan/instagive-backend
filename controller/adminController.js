const jwt = require('jsonwebtoken');
const Admin = require('../model/adminModel');
const Request = require('../model/requestModel');

// Admin Login
exports.login = async (req, res) => {
 

console.log(req.body)


  const admin = await Admin.findOne({
    username: req.body.username,
    password: req.body.password,
  });

if (!admin) return res.send({valid: 'CREDENTIALS NOT FOUND!'});






  const id = admin._id;

  const token = jwt.sign({ id }, process.env.jwtPrivateKey);


  res.send({valid: true, token});
};















//  Admin Logout
// exports.logout = async (req, res) => {
//   if (req.cookies.admin)
//     return res.clearCookie('admin').send('Logout Successfully');
//   else res.status(500).send('You are not login!');
// };






exports.getAllAccounts = async (req, res) => {
  console.log('All Accounts Admin')
  const approved = await Request.find({
    accountStatus:  'approved',
  });

  const pending = await Request.find({
    accountStatus: 'pending',
  });

  const rejected = await Request.find({
    accountStatus: 'rejected',
  });
  
res.send({pending, approved, rejected})
};







exports.changeAccountStatus = async (req, res) => {
  console.log(req.params.status)
 
  const userId = req.params.userId;

  const updateStatus = await Request.findByIdAndUpdate(userId, {
    accountStatus: req.params.status,
  });




  res.send('updated')

};
