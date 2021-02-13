const jwt = require('jsonwebtoken');
const bcyrpt = require('bcrypt');
const Post = require('../model/postModel');
const Request = require('../model/requestModel');
const { transporter } = require('../utility/nodeMailer');
const Orgs = require('../model/orgModel');

// Login
exports.login = async (req, res) => {
  if (req.cookies.user) {
    return res.status(500).send('You are already logged in!');
  }

  console.log(req.body);

  const user = await Orgs.findOne({
    email: req.body.username,
    password: req.body.password,
  });

  if (!user) return res.status(404).send('Credentials Error!');

  const id = user._id;

  const jwtToken = jwt.sign({ id }, process.env.jwtPrivateKey);

  res
    .cookie('user', jwtToken, {
      httpOnly: true,
    })
    .send('Login Success');
};

exports.logout = async (req, res) => {
  if (req.cookies.user)
    return res.clearCookie('user').send('Logout Successful');
  else res.status(500).send('You are not Logged In!');
};

// Request Account
// Doesnt work on postman due to having multipart data
exports.requestAccount = async (req, res) => {
  const {
    email,
    password,
    city,
    region,
    zipcode,
    orgName,
    orgAddress,
    orgNumber,
    repName,
    orgDescriptions,
  } = req.body;

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
    region: region,
    zipcode: zipcode,
    orgName: orgName,
    orgAddress: orgAddress,
    orgPhoto: req.files['orgPhoto'][0].filename,
    orgNumber: orgNumber,
    repName: repName,
    repId: req.files['repId'][0].filename,
    orgDocuments: documents,
    orgDescriptions: orgDescriptions,
    accountStatus: 'pending',
  });

  await request.save();

  let mailOptions = {
    from: 'instagive2021@gmail.com',
    to: 'instagive2021@gmail.com',
    subject: ` REQUESTING ACCOUNT: ${email}`,
    html: `<h2>${email}</h2>
      <h2>${orgName}</h2>
      <h2> ${orgAddress} </h2>
      <h2> ${orgNumber} </h2>
      <h2> ${city} </h2>
      <h2> ${region} </h2>
      <h2> ${zipcode} </h2>
      <h2> ${repName} </h2>
      <h2> ${orgDescriptions} </h2>
  
  
  
  
  
      `,
    attachments: docs,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('MESSAGE SENT!!');
    }
  });

  res.send(request);
};
