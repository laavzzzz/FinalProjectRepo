import jwt from "jsonwebtoken";
import Admin from "../models/Admin.model.js";

export const protectAdmin = async (req, res, next) => {
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

    if (!decoded || decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin role required." });
    }

    // Hydrate active administrator document from MongoDB
    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) {
      return res.status(401).json({ message: "Administrator account no longer exists" });
    }

    req.user = admin;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Authentication token expired" });
    }
    return res.status(401).json({ message: "Token invalid or corrupt" });
  }
};