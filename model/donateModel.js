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
  },

  donationType: {
    type: String,
    default: 'Cash'
  },



    dateNow: {
      type: Date,
      default: Date.now


    }
});

const Donate = mongoose.model('donate', donateSchema);

module.exports = Donate;
