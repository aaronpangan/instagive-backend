const jwt = require('jsonwebtoken');
const Admin = require('../model/adminModel');
const Ledger = require('../model/ledgerModel');
const Post = require('../model/postModel');
const Request = require('../model/requestModel');

const { transporter } = require('../utility/nodeMailer');
// Admin Login
exports.login = async (req, res) => {
  console.log(req.body);

  const admin = await Admin.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (!admin) return res.send({ valid: 'CREDENTIALS NOT FOUND!' });

  const id = admin._id;

  const token = jwt.sign({ id }, 'secretkey');

  res.send({ valid: true, token });
};

exports.getAllPost = async (req, res) => {
  const post = await Post.find();

  res.send(post);
};

//  Admin Logout
// exports.logout = async (req, res) => {
//   if (req.cookies.admin)
//     return res.clearCookie('admin').send('Logout Successfully');
//   else res.status(500).send('You are not login!');
// };

exports.getAllAccounts = async (req, res) => {
  console.log('All Accounts Admin');
  const approved = await Request.find({
    accountStatus: 'approved',
  });

  const pending = await Request.find({
    accountStatus: 'pending',
  });

  const rejected = await Request.find({
    accountStatus: 'rejected',
  });

  res.send({ pending, approved, rejected });
};

exports.changeAccountStatus = async (req, res) => {
  console.log(req.params.status);

  const userId = req.params.userId;

  const updateStatus = await Request.findByIdAndUpdate(userId, {
    accountStatus: req.params.status,
  });

  const token = jwt.sign({ id: req.params.userId }, 'secretkey');

  const approvedMessage = `<h2>We pleased to inform you that your application has been ${req.params.status}</h2>  <h2>Click the link to automatically log in   https://instagive.vercel.app/login/email/${token}</h2>`;
  const rejectedMessage = `<h2> We are sorry to inform you that your applicated has been denied. To know more about the details, Please Contact us via Email or Messenger</h2>`;
  let mailContent = {
    from: 'instagive2021@gmail.com',
    to: updateStatus.email,
    subject: `InstaGive Pampanga`,
    html: `<h1>Thank for your registering in Instagive </h1>

      ${req.params.status === 'approved' ? approvedMessage : rejectedMessage}
    `,
  };

  transporter.sendMail(mailContent, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('MESSAGE SENT!!');
    }
  });

  res.send('updated');
};

exports.getUserLedger = async (req, res) => {
  const ledger = await Ledger.find();

  res.send(ledger);
};

exports.userLedger = async (req, res) => {
  const ledger = await Ledger.find({
    userId: req.params.userId,
  });

  res.send(ledger);
};

exports.userPost = async (req, res) => {
  const userPost = await Post.find({ User: req.params.userId });

  res.send(userPost);
};

exports.changePostStatus = async (req, res) => {
  const postStatus = await Post.findByIdAndUpdate(req.params.postId, {
    status: req.params.status,
  });

  res.send(postStatus);
};

exports.changeLedgerStatus = async (req, res) => {
  const ledger = await Ledger.findByIdAndUpdate(req.params.ledgerId, {
    status: req.params.status,
  });

  await ledger.save();

  res.send(ledger);
};
