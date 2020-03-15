// Custom authentication middleware to verify web token

const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  // Receive token from header
  const token = req.header('x-auth-token');

  // Check to see if there is a token in the header
  if (!token) {
    return res.status(401).json({ mgs: 'Unauthorized: No token received' });
  }

  // Verify token is valid
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Unauthorized: Token is not valid' });
  }
};
