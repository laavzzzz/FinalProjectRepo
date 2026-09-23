import jwt from "jsonwebtoken";
import Doctor from "../models/Doctor.model.js";

export const protectDoctor = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, no token provided" });
    }

    const token = authHeader.split(" ")[1]?.trim();
    if (!token) {
      return res.status(401).json({ message: "Not authorized, malformed token" });
    }

    const secret = process.env.JWT_SECRET || "careflow_default_secret_key";
    const decoded = jwt.verify(token, secret);

    if (!decoded || decoded.role !== "doctor") {
      return res.status(403).json({ message: "Access denied. Doctor role required." });
    }

    // Hydrate active doctor document from MongoDB
    const doctor = await Doctor.findById(decoded.id).select("-password");
    if (!doctor) {
      return res.status(401).json({ message: "Doctor account no longer exists" });
    }

    req.user = doctor;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Authentication token expired" });
    }
    return res.status(401).json({ message: "Token invalid or corrupt" });
  }
};