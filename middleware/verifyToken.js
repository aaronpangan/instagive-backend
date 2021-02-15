const jwt = require('jsonwebtoken');


// Check if someone is logged in
exports.verifyCookie = (req, res, next) => {
  if (req.cookies.user) {
    next();
  } else return res.status(404).send('LOGIN FIRST');
};



//  Check if the login is the one stored in jwt
exports.verifyToken = (req, res, next) => {
  try {
    let decode = jwt.verify(req.cookies.user, process.env.jwtPrivateKey);
    //created a new request, to be sent to next()
    req.user = decode;
    next();
  } catch (err) {
    return res.status(404).send('INVALID JWT');
  }
};
