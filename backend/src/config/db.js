const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            console.warn("DB connected failed: MONGODB_URI is not set in env.");
            return false;
        }
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected successfully");
        return true;
    } catch (err) {
        console.error("Database connection failed:", err.message);
        return false;
    }
};

module.exports = connectDB;