const Ledger = require('../model/ledgerModel');
const Post = require('../model/postModel');
const Request = require('../model/requestModel');
const fs = require('fs');
const path = require('path');
const pdf = require('pdfkit');
const { transporter } = require('../utility/nodeMailer');




exports.allRecord = async (req, res) => {
  
  
  
  const record = await Ledger.find({
    userId: req.user.id,
  });

console.log('Get all Ledger')


res.send(record);



};









exports.addRecord = async (req, res) => {
  
  const postId = req.params.postId;
  
  
  
  
  const amount = await Post.findById(postId);
  
  const userId = amount.User;
  
  const record = await new Ledger({
    userId,
    postId,
    donorName: req.body.donorName,
    email: req.body.email === '' ? 'None' : req.body.email,
    donationType: req.body.donationType,
    paymentAddress: req.body.paymentAddress,
    amount: req.body.amount,
    remarks: req.body.remarks,
    date: req.body.date,
  });
  
  await record.save();
  
  // Adding Total Amount and Total Donors in post

  const pushCurrentAmount = await Post.findByIdAndUpdate(postId, {
    currentAmount: amount.currentAmount + parseInt(req.body.amount),
    totalDonors: amount.totalDonors + 1,
  });
  
  await pushCurrentAmount.save();
  
  // Adding Total Donors in the request account
  const donors = await Request.findById(userId);
  
  const pushTotalDonors = await Request.findByIdAndUpdate(userId, {
    totalDonors: donors.totalDonors + 1,
  });
  
  await pushTotalDonors.save();
  
  
  
  
  if(req.body.email !== ''){


    const doc = new pdf({
      layout: 'landscape',
      size: 'A4',
    });
  
    const Dname = req.body.donorName;
  
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
  
    doc.fontSize(22).text(`${donors.repName}`, 370, 430, {
      align: 'center',
    });
  
    doc.fontSize(22).text('INSTAGIVE PH', 180, 430, {
      align: 'left',
    });
  
    doc.end();
    


    let mailOptions = {
      from: 'instagive2021@gmail.com',
      to: req.body.email,
      subject: `Certificate: ${req.body.email}`,
      html: `<h2>Thank you for Donating ${req.body.donorName}, Here is your Certificate</h2>
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

















  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  



  res.send(record);
};











exports.deleteRecord = async (req, res) => {
  const record = await Ledger.findByIdAndDelete(req.params.recordId);

  res.send('Delete Success');
};
