const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).send({ error: 'No token provided' });
    }
    jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (error) {
    res.send({ error: error.message });
  }
};

module.exports = auth;
