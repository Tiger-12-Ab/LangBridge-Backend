const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization; 
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided. Access denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
 
    const decoded = jwt.verify(token, JWT_SECRET);   
    req.user = await User.findById(decoded.userId).select('-password');

    next(); 
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = authenticateUser;
