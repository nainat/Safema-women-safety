const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
    console.log("📩 Incoming Register Request:", req.body);

    const { name, email, username, password } = req.body;  // ✅ Ensure username is included

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, username, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("❌ Server Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});




// Login User
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "User not found" });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(401).json({ error: "Invalid credentials" });

        res.json({ message: "Login successful", user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Get user profile by ID (No Middleware)
router.get("/profile/:id", async (req, res) => {
  try {
    console.log("Received User ID:", req.params.id); // Debugging log
    const user = await User.findById(req.params.id).select("-password");
    
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error" });
  }
});




module.exports = router;
