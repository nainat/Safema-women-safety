const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// ✅ REGISTER USER
router.post("/register", async (req, res) => {
    console.log("📩 Register Request Received:", req.body);

    const { name, email, username, password } = req.body;

    try {
        if (!name || !email || !username || !password) {
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
        console.error("❌ Error in Register Route:", error.message);
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ LOGIN USER
router.post("/login", async (req, res) => {
    console.log("📩 Incoming Login Request:", req.body);
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "User not found" });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(401).json({ error: "Invalid credentials" });

        res.json({ message: "Login successful", user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.error("❌ Server Error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
