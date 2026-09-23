import express from "express";
import {
  loginAdmin,
  registerAdmin,
} from "../controllers/doctorAdmin.controller.js";
import { protectAdmin } from "../middlewares/adminAuth.middleware.js";

const router = express.Router();

/**
 * @route   POST /api/admin/login
 * @desc    Authenticate system administrator & return JWT token
 * @access  Public
 */
router.post("/login", loginAdmin);

/**
 * @route   POST /api/admin/register
 * @desc    Register a new administrator account (System/Initial Provisioning)
 * @access  Public / SuperAdmin
 */
router.post("/register", registerAdmin);

/**
 * @route   GET /api/admin/me
 * @desc    Get currently authenticated administrator profile
 * @access  Private (Admin Only)
 */
router.get("/me", protectAdmin, (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized, admin profile missing" });
  }

  return res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role || "admin",
      isSuperAdmin: req.user.isSuperAdmin ?? false,
      permissions: req.user.permissions || [
        "manage_doctors",
        "manage_patients",
        "manage_appointments",
        "view_analytics",
      ],
    },
  });
});

export default router;