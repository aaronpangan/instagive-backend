const jwt = require('jsonwebtoken');



//  Check if the login is the one stored in jwt
module.exports = (req, res, next) => {
  const token = req.body.token;
  console.log(token)
if(!token) return res.status(500).send('Missing Token!')

  try {
    let decoded = jwt.verify(token, 'secretkey');
    //created a new request, to be sent to next()
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(404).send('INVALID JWT');
  }
};




