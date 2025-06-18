const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Load from .env
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '7d';

// Register a user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if all fields are filled
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email is already in use." });
    }



    // Create and save the new user
    const newUser = new User({
      name,
      email,
      password: password.trim(),
    });
    await newUser.save();

    // Creating JWT token
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(201).json({
      message: "User registered successfully.",
      token,
      user: {
        id: newUser._id, 
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error during registration." }); 
  }
};

// Login existing user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check all fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Finding user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Email or Password." });
    }
    // Comparing password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Email or Password." }); 
    }
    // Creating JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    }); 

    res.status(200).json({
      message: "Login successful.", 
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error during login." });
  }
};

module.exports = {
  registerUser,
  loginUser,
};




