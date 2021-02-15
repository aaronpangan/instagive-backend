const { transporter } = require('../utility/nodeMailer');
const Post = require('../model/postModel');
const fs = require('fs');
const path = require('path');
const Donate = require('../model/donateModel');
const pdf = require('pdfkit');
const Request = require('../model/requestModel');

// For donating, get the post ID first

exports.donate = async (req, res) => {
  const { amount, name, email, message } = req.body;
  const id = req.params.postId;

  // For Adding Donor List in Post
  const post = await Post.findById(id);

  const newAmount = post.currentAmount + parseInt(amount);
  const newDonor = post.totalDonors + 1;

  const newPost = await Post.findByIdAndUpdate(
    id,
    {
      currentAmount: newAmount,
      totalDonors: newDonor,
    },
    { new: true }
  );
  await newPost.save();

  // For Adding Donor List in USer
  const user = await Request.findById(post.User);

  const newDonorUser = user.totalDonors + 1;

  const pushNewDonorUser = await Request.findByIdAndUpdate({
    totalDonors: newDonorUser,
  });

  await pushNewDonorUser.save();

  const doc = new pdf({
    layout: 'landscape',
    size: 'A4',
  });

  const Dname = name;

  doc.pipe(
    fs.createWriteStream(
      `${path.dirname(require.main.filename)}/public/certificate/${Dname}.pdf`
    )
  );

  doc.image(
    `${path.dirname(require.main.filename)}/public/certificate/cert.png`,
    0,
    0,
    { width: 842 }
  );

  doc.fontSize(53).text(Dname, 50, 240, {
    align: 'center',
  });

  doc.fontSize(30).text('Sample Charity Org', 76, 350, {
    align: 'center',
  });

  doc.fontSize(22).text('Sample Representative Name', 370, 430, {
    align: 'center',
  });

  doc.fontSize(22).text('INSTAGIVE PH', 180, 430, {
    align: 'left',
  });

  doc.end();

  let mailOptions = {
    from: 'instagive2021@gmail.com',
    to: 'instagive2021@gmail.com',
    subject: `Certificate: ${email}`,
    html: `<h2>Thank you for Donating ${name}, Here is your Certificate</h2>
     >
  
  
      `,
    attachments: {
      filename: `${Dname}.pdf`,
      path: `${path.dirname(
        require.main.filename
      )}/public/certificate/${Dname}.pdf`,
    },
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('MESSAGE SENT!!');
    }
  });

  const donate = new Donate({
    PostId: id,
    dateDonated: Date.now(),
    certrificate: `${path.dirname(
      require.main.filename
    )}/public/certificate/${Dname}.pdf`,
    name: name,
    amount: amount,
    message: message,
    email: email,
  });

  await donate.save();

  console.log(donate);
  res.send(donate);
};
