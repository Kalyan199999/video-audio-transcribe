const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const verify = (req, res, next) => {
  try 
  {
    const authHeader = req.headers['authorization'];

    if (!authHeader) 
    {
      return res.status(401).json({ ok: false, message: 'Authorization header missing.' });
    }

    // Expect format: "Bearer <token>"
    const token = authHeader.split(' ')[1];

    if (!token) 
    {
      return res.status(401).json({ ok: false, message: 'Token missing.' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => 
    {
      if (err) 
      {
        return res.status(403).json({ ok: false, message: 'Invalid or expired token.' });
      }
      // Attach decoded user info to request
      req.user = decoded;
      next(); // move to next middleware or controller
    });
  }
  catch (error) 
  {
    console.error('Error verifying token:', error);
    return res.status(500).json({ ok: false, message: 'Internal server error.' });
  }
};

module.exports = verify;