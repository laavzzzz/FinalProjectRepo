import jwt from "jsonwebtoken";
import Patient from "../models/Patient.model.js";

export const protectPatient = async (req, res, next) => {
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

    if (!decoded || (decoded.role && decoded.role !== "patient")) {
      return res.status(403).json({ message: "Access denied. Patient role required." });
    }

    // Hydrate active patient document from MongoDB
    const patient = await Patient.findById(decoded.id).select("-password");
    if (!patient) {
      return res.status(401).json({ message: "Patient account no longer exists" });
    }

    req.user = patient;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Authentication token expired" });
    }
    return res.status(401).json({ message: "Token invalid or corrupt" });
  }
};