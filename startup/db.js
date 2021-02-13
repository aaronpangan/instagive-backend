const mongoose = require('mongoose');

module.exports = function() {
  mongoose
    .connect('mongodb://localhost/instagive', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => {
      console.log('Connected to the database');
    })
    .catch((err) => {
      console.log('Connection Failed');
    });
};
