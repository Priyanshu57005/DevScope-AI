const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

const profileRoutes = require("./routes/profile.routes");
const activityRoutes = require("./routes/activity.routes");
const compareRoutes = require("./routes/compare.routes");

const notFound = require("./middleware/notFound.middleware");
const errorHandler = require("./middleware/error.middleware");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));

// Rate Limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});

app.use(limiter);

// Routes
app.use("/api/profile", profileRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/compare", compareRoutes);

// Health Check Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "DevScope AI Backend is running ",
    });
});

// Error handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;