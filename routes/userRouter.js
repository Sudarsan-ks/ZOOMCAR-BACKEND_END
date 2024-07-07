const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 8);
    const isUserExist = await User.findOne({ email: email });
    if (isUserExist) {
      return res
        .status(500)
        .json({ message: "This email is alreday registered" });
    }
    const newUser = new User({ username, email, password: hashPassword, role });
    await newUser.save();
    res.status(201).json({ message: "Registered sucessfully", newUser });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!user || !checkPassword) {
      return res.status(404).json({ error: "Invalid Credentials" });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.SECRET_KEY
    );
    res.json({ Message: "Login sucessfully", token, user });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

module.exports = router;
