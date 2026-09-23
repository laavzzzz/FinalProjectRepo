import express from "express";
import {
  loginDoctor,
  registerDoctor,
} from "../controllers/doctorAdmin.controller.js";
import { protectDoctor } from "../middlewares/doctorAuth.middleware.js";

const router = express.Router();

/**
 * @route   POST /api/doctor/login
 * @desc    Authenticate doctor & return JWT token
 * @access  Public
 */
router.post("/login", loginDoctor);

/**
 * @route   POST /api/doctor/register
 * @desc    Register a new doctor account (Admin/Internal)
 * @access  Public / Admin
 */
router.post("/register", registerDoctor);

/**
 * @route   GET /api/doctor/me
 * @desc    Get currently authenticated doctor profile
 * @access  Private (Doctor Only)
 */
router.get("/me", protectDoctor, (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized, doctor profile missing" });
  }

  return res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role || "doctor",
      department: req.user.department || "Dermatology",
      specialization: req.user.specialization || "General & Cosmetic Dermatology",
      isAvailable: req.user.isAvailable ?? true,
    },
  });
});

export default router;