import express from "express";
import { predictCrop } from "../services/modelClient.js";

const router = express.Router();

router.post("/recommend", async (req, res) => {
  try {
    const input = req.body;

    const mlResult = await predictCrop(input);

    return res.json({
      success: true,
      source: mlResult.fallback ? "fallback-rule" : "ml-model",
      data: mlResult
    });

  } catch (error) {
    console.error("❌ Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Backend error"
    });
  }
});

export default router;
