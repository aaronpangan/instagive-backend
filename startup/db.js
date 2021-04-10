const mongoose = require('mongoose');

module.exports = function() {
  mongoose
    .connect('mongodb+srv://admin:admin@instagive.j2xlx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
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
