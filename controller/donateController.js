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


  console.log(req.body)
   await newPost.save();

  // For Adding Donor List in USer
  const user = await Request.findById(post.User);



  const newDonorUser = user.totalDonors + 1;

  
  const pushNewDonorUser = await Request.findByIdAndUpdate(post.User,{
    totalDonors: newDonorUser,
  });

  await pushNewDonorUser.save();


  const donate = new Donate({
    PostId: id,
    dateDonated: Date.now(),
    name: name ==='' ? 'Anonymous' : req.body.name,
    amount,
    message: message ==='' ? 'No Message' : req.body.message,
    email,
  });
  await donate.save();


 









  if(req.body.email !== '') {

  const doc = new pdf({
    layout: 'landscape',
    size: 'A4',
  });

  const Dname = donate.name;

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

  doc.fontSize(30).text(`${post.Title}`, 76, 350, {
    align: 'center',
  });

  doc.fontSize(22).text(`${user.orgName}`, 370, 430, {
    align: 'center',
  });

  doc.fontSize(22).text('INSTAGIVE PH', 180, 430, {
    align: 'left',
  });

  doc.end();

  let mailOptions = {
    from: 'instagive2021@gmail.com',
    to: email,
    subject: `Certificate: ${email}`,
    html: `<h2>Thank you for Donating ${Dname}, Here is your Certificate</h2>
     
  
  
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

  }









  // certrificate: `${path.dirname(
  //   require.main.filename
  // )}/public/certificate/${Dname}.pdf`,





  res.send(donate);
};
