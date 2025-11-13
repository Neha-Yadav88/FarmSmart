import express from "express";
import { analyzeSoil } from "../services/soilEngine.js";

const router = express.Router();

// Soil Analysis API (Rule-Based)
router.post("/analyze", async (req, res) => {
  try {
    const input = req.body;

    // Basic validation (can be improved later)
    if (!input.ph || !input.N || !input.P || !input.K) {
      return res.status(400).json({
        success: false,
        message: "Fields missing: ph, N, P, K are required."
      });
    }

    const result = analyzeSoil(input);

    return res.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error("Soil analysis error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

export default router;
