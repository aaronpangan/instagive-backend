const jwt = require('jsonwebtoken');
const bcyrpt = require('bcrypt');
const Post = require('../model/postModel');
const Request = require('../model/requestModel');
const { transporter } = require('../utility/nodeMailer');
const mongoose = require('mongoose');

// Login
exports.login = async (req, res) => {
  console.log(req.body);

  const user = await Request.findOne({
    email: req.body.username,
    password: req.body.password,
  });

  if (!user) return res.send({valid: 'Credentials Error'});

  if (user.accountStatus != 'approved')
    return res.send({valid: 'Your account is still under review'});

  const id = user._id;

  const token = jwt.sign({ id }, process.env.jwtPrivateKey);

  res.status(200).send({valid: true, token});
};

// exports.logout = async (req, res) => {
//   if (req.cookies.user)
//     return res.clearCookie('user').send('Logout Successful');
//   else res.status(500).send('You are not Logged In!');
// };

// Request Account
// Doesnt work on postman due to having multipart data
exports.requestAccount = async (req, res) => {
  const {
    email,
    password,
    city,

    orgName,
    orgAddress,
    orgNumber,
    repName,
    orgDescriptions,
  } = req.body;




  const user = await Request.findOne({
    email: req.body.email,
  });

  if (user) return res.status(400).send('Email Already Exist');

  let documents = [];

  req.files['orgDocuments'].forEach((files) => {
    documents.push(files.filename);
  });

  let docs = req.files['orgDocuments'].map((files) => {
    return {
      filename: files.filename,
      path: files.path,
    };
  });

  docs.push({
    filename: req.files['orgPhoto'][0].filename,
    path: req.files['orgPhoto'][0].path,
  });

  docs.push({
    filename: req.files['repId'][0].filename,
    path: req.files['repId'][0].path,
  });

  console.log(docs);
  const request = await new Request({
    email: email,
    password: password,
    city: city,
    orgName: orgName,
    orgAddress: orgAddress,
    orgPhoto: req.files['orgPhoto'][0].filename,
    orgNumber: orgNumber,
    repName: repName,
    repId: req.files['repId'][0].filename,
    orgDocuments: documents,
    orgDescriptions: orgDescriptions,
    totalPost: 0,
    totalDonors: 0,
    accountStatus: 'pending',
  });

  await request.save();

  let mailContent = {
    from: 'instagive2021@gmail.com',
    to: 'instagive2021@gmail.com',
    subject: ` REQUESTING ACCOUNT: ${email}`,
    html: `<h2>${email}</h2>
      <h2>${orgName}</h2>
      <h2> ${orgAddress} </h2>
      <h2> ${orgNumber} </h2>
      <h2> ${city} </h2>
      <h2> ${repName} </h2>
      <h2> ${orgDescriptions} </h2>
  
  
  
  
      `,
    attachments: docs,
  };

  transporter.sendMail(mailContent, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('MESSAGE SENT!!');
    }
  });

  res.send('Success');
};

// Change Password

exports.changePassword = async (req, res) => {
  const userId = req.user.id;

  const checkOldPassword = await Request.findById(userId);

  if (req.body.oldPassword !== checkOldPassword.password)
    return res.status(500).send('Wrong Old Password!');

  const user = await Request.findByIdAndUpdate(userId, {
    password: req.body.newPassword,
  });

  await user.save();

  res.send('Password Successfuly Changed');
};

// Forgot Password

exports.forgotPassword = async (req, res) => {
  const userEmail = await Request.findOne({
    email: req.body.email,
  });

  if (!userEmail) return res.status(500).send('Email Not Found');

  const newPassword = mongoose.Types.ObjectId();

  const setNewPassword = await Request.findByIdAndUpdate(userEmail._id, {
    password: newPassword,
  });

  await setNewPassword.save();

  // Change this to user email
  let mailContent = {
    from: 'instagive2021@gmail.com',
    to: 'instagive2021@gmail.com',
    subject: `Instagive Pampanga - Change Password`,
    html: `<h1>Your Temporary Password is:  ${newPassword}</h1>
      <h2>Please change it after you Logged in. Thank You!</h2>
    `,
  };

  transporter.sendMail(mailContent, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('MESSAGE SENT!!');
    }
  });

  res.send('Temporary Password sent to email');
};
