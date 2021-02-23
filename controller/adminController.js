const jwt = require('jsonwebtoken');
const Admin = require('../model/adminModel');
const Request = require('../model/requestModel');

// Admin Login
exports.login = async (req, res) => {
 

  const admin = await Admin.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (!admin) return res.status(404).send('Wrong Credentials');

  const id = admin._id;

  const jwtToken = jwt.sign({ id }, process.env.jwtPrivateKey);


  res.header('admin', jwtToken).send('Success');
};















//  Admin Logout
// exports.logout = async (req, res) => {
//   if (req.cookies.admin)
//     return res.clearCookie('admin').send('Logout Successfully');
//   else res.status(500).send('You are not login!');
// };






exports.getAllAccounts = async (req, res) => {
  const approved = Request.find({
    accountStatus: 'approved',
  });

  const pending = Request.find({
    accountStatus: 'pending',
  });

  const deleted = Request.find({
    accountStatus: 'deleted',
  });

  res.send({ approved, pending, deleted });
};







exports.changeAccountStatus = async (req, res) => {
  const userId = req.params.userId;

  const updateStatus = Request.findByIdAndUpdate(userId, {
    accountStatus: req.params.status,
  });
};
