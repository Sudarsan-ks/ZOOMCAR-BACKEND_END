const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).send({ error: "No token provided" });
    }
    const checkMatching = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ _id: checkMatching.id });
    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.send({ error: error.message });
  }
};

module.exports = auth;
