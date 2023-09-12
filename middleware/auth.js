
const jwt = require('jsonwebtoken');

exports.requireAuth = (req, res, next) => {
    const token = req.cookies.token;
    // console.log(token)
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
      const decodedToken = jwt.verify(token, 'mysecretkey');
      // console.log(decodedToken)
      req.user = decodedToken;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  };
  