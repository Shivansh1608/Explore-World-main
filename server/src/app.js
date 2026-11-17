import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

// Route imports
import authRoutes from "./modules/auth/auth.routes.js";
import destinationRoutes from "./modules/destinations/destination.routes.js";
import tripRoutes from "./modules/trips/trip.routes.js";
import postRoutes from "./modules/posts/post.routes.js";
import reviewRoutes from "./modules/reviews/review.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";
import aiRoutes from "./modules/ai/ai.routes.js";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Health check API
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Explore World API is running",
    timestamp: new Date().toISOString(),
  });
});

// Domain Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/destinations", destinationRoutes);
app.use("/api/v1/trips", tripRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/ai", aiRoutes);

// Central 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Resource not found on ${req.originalUrl}`,
  });
});

// Central error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors || [],
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

export default app;
