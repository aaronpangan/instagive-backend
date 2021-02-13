const nodemailer = require('nodemailer');

exports.transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'instagive2021@gmail.com',
    pass: 'Instagivethesis2021',
  },
});
