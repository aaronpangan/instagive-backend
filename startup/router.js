const express = require('express');
const landingRouter = require('../routes/landingRouter');
const userRouter = require('../routes/userRoutes');
const adminRouter = require('../routes/adminRoutes');
const donateRouter = require('../routes/donateRoutes');

const postUpdateRouter = require('../routes/postUpdateRoutes');
const userpost = require('../routes/userRoutes');

module.exports = function (app, dir) {
  app.use(express.json());

  // Landing Page || View Post > Donate
  app.use('/landing', landingRouter);
  app.use('/user', userRouter);
  app.use('/admin', adminRouter);
  app.use('/donate', donateRouter);
  app.use('/updates', postUpdateRouter);
  app.use('/userpost', userpost);
  // Error
  app.use((req, res, next) => {
    res.status(404).send('PAGE NOT FOUND');
  });
};
