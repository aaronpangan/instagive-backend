const jwt = require('jsonwebtoken');
const Admin = require('../model/adminModel');

// Admin Login
exports.login = async (req, res) => {
  if (req.cookies.admin) {
    return res.status(500).send('You are already Login');
  }

  const admin = await Admin.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (!admin) return res.status(404).send('Wrong Credentials');

  const id = admin._id;

  const jwtToken = jwt.sign({ id }, process.env.jwtPrivateKey);

  res
    .cookie('admin', jwtToken, {
      httpOnly: true,
    })
    .send('Success');
};

// Admin Logout
exports.logout = async (req, res) => {
  if (req.cookies.admin)
    return res.clearCookie('admin').send('Logout Successfully');
  else res.status(500).send('You are not login!');
};
