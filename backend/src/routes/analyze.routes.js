import express from "express";
import multer from "multer";
import Groq from "groq-sdk";
import { analyzeImage } from "../controllers/analyze.controller.js";

const router = express.Router();

// ==========================================
// 🔹 Multer Configuration (Memory Storage)
// ==========================================
const storage = multer.memoryStorage();

// Restrict uploads to valid image formats under 10MB
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB maximum
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, WEBP, and HEIC images are allowed."));
    }
  },
});

// ==========================================
// 🔹 Groq Client Initialization
// ==========================================
const getGroqClient = () => {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new Groq({ apiKey });
};

// ==========================================
// 🔹 Fallback Groq AI Skin Direct Analysis Handler
// ==========================================
const processGroqSkinAnalysis = async (req, res, next) => {
  try {
    // If external controller exists, delegate to analyzeImage
    if (typeof analyzeImage === "function") {
      return analyzeImage(req, res, next);
    }

    let base64Image = "";

    // Extract image from Multer file upload OR json body
    if (req.file) {
      base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    } else if (req.body && req.body.imageBase64) {
      base64Image = req.body.imageBase64.startsWith("data:image/")
        ? req.body.imageBase64
        : `data:image/jpeg;base64,${req.body.imageBase64}`;
    } else {
      return res.status(400).json({
        success: false,
        message: "No image provided. Please upload an image file or provide a base64 string.",
      });
    }

    const groq = getGroqClient();
    if (!groq) {
      return res.status(500).json({
        success: false,
        message: "Groq API key is not configured on the backend server (GROQ_API_KEY missing).",
      });
    }

    // Call Groq Vision Llama 3.2 Model
    const chatCompletion = await groq.chat.completions.create({
      model: "llama-3.2-11b-vision-instruct",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `You are an expert AI dermatology clinical assistant. Examine the uploaded image of a skin lesion or condition provided by the patient.
              Provide a clear, structured, and empathetic preliminary assessment including:
              1. Visual Features Observed: (Color variation, border regularity, texture, elevation, surface characteristics).
              2. Clinical Characteristics & Potential Non-Diagnostic Observations: (List 2-3 common conditions matching these visual traits).
              3. Triage & Recommended Next Steps: (Urgency level, suggested specialist consultation, general home care avoidances).
              4. Mandatory Medical Disclaimer: (Clearly state that this AI evaluation is NOT a formal diagnosis and must be confirmed by a licensed medical practitioner).`,
            },
            {
              type: "image_url",
              image_url: {
                url: base64Image,
              },
            },
          ],
        },
      ],
      temperature: 0.2,
      max_tokens: 1024,
    });

    const resultText = chatCompletion.choices[0]?.message?.content || "Analysis could not be generated.";

    return res.status(200).json({
      success: true,
      analysis: resultText,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("🔥 Error in Skin Condition Analysis Route:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to analyze skin condition image.",
    });
  }
};

// ==========================================
// 🔹 Route Definitions
// ==========================================

/**
 * @route   GET /api/analyze
 * @desc    Check health status of analyze service
 * @access  Public
 */
router.get("/", (req, res) => {
  res.status(200).json({
    status: "online",
    service: "CareFlow AI Skin Analysis Gateway",
  });
});

/**
 * @route   POST /api/analyze
 * @desc    Analyze uploaded skin condition image (Multipart form or JSON Base64)
 * @access  Public / Protected
 */
router.post(
  "/",
  (req, res, next) => {
    // Wrap Multer middleware to gracefully catch file limit errors
    upload.single("image")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            success: false,
            message: "File size exceeds the 10MB limit. Please upload a smaller image.",
          });
        }
        return res.status(400).json({ success: false, message: err.message });
      } else if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      next();
    });
  },
  processGroqSkinAnalysis
);

export default router;