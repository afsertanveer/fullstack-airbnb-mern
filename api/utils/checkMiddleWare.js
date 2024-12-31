const jwt = require('jsonwebtoken');

function check(req, res, next) {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, data) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid token' }); // Handle invalid token gracefully
      }
      req.user = data;
    });
  } else {
    return res
      .status(401)
      .json({ error: 'Authentication error: Token missing' }); // Handle missing token
  }
  next();
}

module.exports = check;
