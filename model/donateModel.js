const mongoose = require('mongoose');

const donateSchema = new mongoose.Schema({
  PostId: mongoose.ObjectId,
  dateDonated: Date,
  name:{

    type: String,
    default: 'Anonymous'

  },
  amount: Number,
  message:{

    type: String,
    default: 'No Message'

  },
 
  
  email: {
    type: String,
    default: ''
  }
});

const Donate = mongoose.model('donate', donateSchema);

module.exports = Donate;
