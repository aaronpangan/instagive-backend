const Ledger = require('../model/ledgerModel');
const Post = require('../model/postModel');
const Request = require('../model/requestModel');
const fs = require('fs');
const path = require('path');
const pdf = require('pdfkit');
const { transporter } = require('../utility/nodeMailer');
const { findById, findByIdAndUpdate } = require('../model/ledgerModel');


exports.allRecord = async (req, res) => {
  const record = await Ledger.find({
    userId: req.user.id,
  }).sort({ dateNow: 'desc' });

  console.log('Get all Ledger');

  res.send(record);
};







exports.addRecord = async (req, res) => {
  
  const postId = req.params.postId;

  const amount = await Post.findById(postId);

  const userId = amount.User;



  const record = await new Ledger({
    userId,
    postId,
    donorName: req.body.donorName === '' ? 'Anonymous' : req.body.donorName,
    email: req.body.email === '' ? 'None' : req.body.email,
    donationType: req.body.donationType,
    paymentAddress:
      req.body.paymentAddress === '' ? 'None' : req.body.paymentAddress,
    amount: req.body.amount,
    remarks: req.body.remarks,
    date: req.body.date,
    status: "Approved"
  });

  await record.save();
  console.log(record);





  // Adding Total Amount and Total Donors in post

  if (req.body.donationType === 'Cash') {
    const pushCurrentAmount = await Post.findByIdAndUpdate(postId, {
      currentAmount: amount.currentAmount + parseInt(req.body.amount),
      totalDonors: amount.totalDonors + 1,
    });

    await pushCurrentAmount.save();


  } else if (req.body.donationType === 'In-Kind') {
    const pushItem = await Post.findByIdAndUpdate(postId, {
      totalDonors: amount.totalDonors + 1,
      itemQuantity: amount.itemQuantity + parseInt(req.body.amount),
    });

    await pushItem.save();

    console.log(amount.itemQuantity + parseInt(req.body.amount));

    
  }

  // Adding Total Donors in the request account
  const donors = await Request.findById(userId);

  const pushTotalDonors = await Request.findByIdAndUpdate(userId, {
    totalDonors: donors.totalDonors + 1,
  });

  await pushTotalDonors.save();

  if (req.body.email !== '') {
    const doc = new pdf({
      layout: 'landscape',
      size: 'A4',
    });

    const Dname = req.body.donorName === '' ? 'Anonymous' : req.body.donorName;

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

    doc.fontSize(30).text(`${donors.orgName}`, 76, 350, {
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


exports.donateButton = async (req, res) => {

 const postId = req.params.postId;

  const amount = await Post.findById(postId);

  const userId = amount.User;

  const date = new Date()
 
    const today = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`

 const record = await new Ledger({
    userId,
    postId,
    donorName: req.body.donorName === '' ? 'Anonymous' : req.body.donorName,
    email: req.body.email === '' ? 'None' : req.body.email,
    donationType: amount.donationType === 'Both' ? req.body.donationType : amount.donationType,
    paymentAddress:
      req.body.paymentAddress === '' ? 'None' : req.body.paymentAddress,
    amount: req.body.amount,
    remarks: req.body.remarks,
    date: today,
    status: "Pending"
  });




  
      await record.save();
      console.log(today)
res.send('Success!')

}











exports.changeStatus = async (req, res) => {

  const ledgerId = req.params.ledgerId;
  const status = req.params.status

  
  const updateStatus = await Ledger.findByIdAndUpdate(ledgerId, {
    
    status 
    
  })
  
  await updateStatus.save();
  
  const amount = await Post.findById(updateStatus.postId);
  const userId = amount.User;
  const donors = await Request.findById(userId);



  if(status === 'Approved'){

    const ledgerAmount = parseInt(updateStatus.amount);
    const donationType  = updateStatus.donationType;

    if (donationType === 'Cash') {
      const pushCurrentAmount = await Post.findByIdAndUpdate(updateStatus.postId, {
        currentAmount: amount.currentAmount + ledgerAmount,
        totalDonors: amount.totalDonors + 1,
      });
  
      await pushCurrentAmount.save();
  
  
    } else if (donationType === 'In-Kind') {
      const pushItem = await Post.findByIdAndUpdate(updateStatus.postId, {
        totalDonors: amount.totalDonors + 1,
        itemQuantity: amount.itemQuantity + ledgerAmount ,
      });
  
      await pushItem.save();
  
  
      
    }


    const pushTotalDonors = await Request.findByIdAndUpdate(userId, {
      totalDonors: donors.totalDonors + 1,
    });
  
    await pushTotalDonors.save();

    if (updateStatus.email !== 'None') {
      const doc = new pdf({
        layout: 'landscape',
        size: 'A4',
      });
  
      const Dname = updateStatus.donorName;
  
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
        to: updateStatus.email,
        subject: `Certificate: ${updateStatus.email}`,
        html: `<h2>Thank you for Donating ${Dname}, Here is your Certificate</h2>
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


  }


}











exports.deleteRecord = async (req, res) => {
  const record = await Ledger.findByIdAndDelete(req.params.recordId);

  res.send('Delete Success');
};
