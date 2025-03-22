
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");


dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Allow connections from all devices in the network
app.use(cors({ origin: "*" }));

// Import routes
const authRoutes = require("./routes/authRoutes");

// Debugging logs
console.log("🔄 Registering Routes...");

// Use Routes
app.use("/api/auth", authRoutes);

console.log("✅ Auth routes registered under /api/auth");

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
