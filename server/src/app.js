import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check API
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Explore World API is running",
    timestamp: new Date().toISOString(),
  });
});

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
