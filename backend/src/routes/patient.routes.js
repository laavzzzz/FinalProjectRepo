import express from "express";
import {
  registerPatient,
  loginPatient,
} from "../controllers/patient.controller.js";
import { protectPatient } from "../middlewares/patientAuth.middleware.js";

const router = express.Router();

/**
 * @route   POST /api/patient/register
 * @desc    Register a new patient account
 * @access  Public
 */
router.post("/register", registerPatient);

/**
 * @route   POST /api/patient/login
 * @desc    Authenticate patient & return JWT token
 * @access  Public
 */
router.post("/login", loginPatient);

/**
 * @route   GET /api/patient/me
 * @desc    Get currently authenticated patient profile
 * @access  Private (Patient Only)
 */
router.get("/me", protectPatient, (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized, user profile missing" });
  }

  return res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role || "patient",
      createdAt: req.user.createdAt,
    },
  });
});

export default router;