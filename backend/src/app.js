import express from "express";
import cors from "cors";

// Router Imports
import patientRoutes from "./routes/patient.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import analyzeRoutes from "./routes/analyze.routes.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();

// ======================
// 🔹 CORS Configuration
// ======================
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5000",
  process.env.FRONTEND_URL,
  process.env.CLIENT_URL,
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests (e.g., mobile apps, curl, Postman, server-to-server)
    if (!origin) {
      return callback(null, true);
    }

    // Check against explicitly whitelisted domains or Vercel preview environments (*.vercel.app)
    const isAllowedDomain = allowedOrigins.includes(origin);
    const isVercelPreview = /\.vercel\.app$/.test(new URL(origin).hostname);

    if (isAllowedDomain || isVercelPreview) {
      return callback(null, true);
    }

    return callback(new Error(`CORS Security Violation: Origin ${origin} not permitted`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  optionsSuccessStatus: 204,
};

// Enable CORS Preflight globally across all endpoints
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

// ======================
// 🔹 Body Parsing Middleware
// ======================
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ======================
// 🔹 API Route Binding
// ======================
app.use("/api/patient", patientRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/admin", adminRoutes);
// Keep legacy non-prefixed URLs working for deployed clients that cached the old API base.
app.use("/patient", patientRoutes);
app.use("/doctor", doctorRoutes);
app.use("/admin", adminRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/analyze", analyzeRoutes);
app.use("/api/ai", aiRoutes);

// ======================
// 🔹 Health Check Endpoints
// ======================
app.get("/", (req, res) => {
  res.status(200).json({
    status: "online",
    service: "CareFlow AI Health API",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

app.get("/api", (req, res) => {
  res.status(200).json({
    status: "online",
    message: "CareFlow Backend API Gateway Operational",
  });
});

// ======================
// 🔹 Global 404 Handler
// ======================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl} - Endpoint not found on CareFlow API Server`,
  });
});

// ======================
// 🔹 Global Error Handler
// ======================
app.use((err, req, res, next) => {
  // Log detailed error stack internally for debugging
  console.error("🔥 Internal Express Application Error:", err.stack || err);

  const statusCode = err.status || err.statusCode || 500;
  const isDev = process.env.NODE_ENV === "development";

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(isDev && { stack: err.stack }),
  });
});

export default app;