const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, unique: true, sparse: true },  // ✅ Fix: Make it sparse
    password: { type: String, required: true }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
