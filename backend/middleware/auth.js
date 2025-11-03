const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token'); // token sent from frontend

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify token using secret
    req.user = decoded.user; // attach user info to request
    next(); // continue to next middleware/route
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
