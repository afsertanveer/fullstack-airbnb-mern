const jwt = require('jsonwebtoken');

// function check(req, res, next) {
//   const { token } = req.cookies;

//   if (token) {
//     jwt.verify(token, process.env.JWT_SECRET, {}, (err, data) => {
//       if (err) {
//         return res.status(403).json({ error: 'Invalid token' }); // Handle invalid token gracefully
//       }
//       req.user = data;
//     });
//   } else {
//     return res
//       .status(401)
//       .json({ error: 'Authentication error: Token missing' }); // Handle missing token
//   }
//   next();
// }

//for deployment

function check(req, res, next) {
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.split(' ')[1]; // Extract token after 'Bearer ' prefix

    jwt.verify(token, process.env.JWT_SECRET, {}, (err, data) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid token' }); // Handle invalid token gracefully
      }
      req.user = data;
      // console.log('hi from check middleware');
      next(); // Ensure the next middleware is executed after successful verification
    });
  } else {
    return res
      .status(401)
      .json({ error: 'Authentication error: Token missing or invalid' }); // Handle missing or invalid token
  }
}

module.exports = check;
