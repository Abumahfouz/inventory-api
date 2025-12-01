const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @route   POST /api/register
exports.createUser = async (req, res) => {
  // Debug log to see what's in the request
  console.log('Received request body:', req.body);

  // Guard in case req.body is undefined 
  let {role, email, password} = req.body || {};
  
  if (!email || !password) {
    return res.status(400).json({ message: 'email and password are required' });
  }

  if (!role) role = 'customer'; // default role

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "✅ User created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @route   POST /api/login
exports.login = async (req, res) => {
  // Guard against missing body
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: 'email and password are required' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Create JWT
    const payload = { userId: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.json({ message: "✅ Login successful", token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @route   GET /api/users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
