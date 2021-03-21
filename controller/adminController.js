const jwt = require('jsonwebtoken');
const Admin = require('../model/adminModel');
const Post = require('../model/postModel');
const Request = require('../model/requestModel');

const { transporter } = require('../utility/nodeMailer');
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




exports.getAllPost = async (req, res) =>{

const post = await Post.find();


res.send(post)
}










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


  await updateStatus.save()


  let mailContent = {
    from: 'instagive2021@gmail.com',
    to: updateStatus.email,
    subject: `InstaGive Pampanga`,
    html: `<h1>Thank for your registering in Instagive </h1>
      <h2>We pleased to inform you that your application has been ${req.params.status}</h2>
    `,
  };

  transporter.sendMail(mailContent, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('MESSAGE SENT!!');
    }
  });


  res.send('updated')

};
