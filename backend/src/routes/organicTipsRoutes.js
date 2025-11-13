import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
const router = express.Router();

// Gemini API function (with retry + fallback)
async function callGemini(prompt) {
  const primaryModel = "gemini-2.5-flash";
  const fallbackModel = "gemini-1.5-flash";

  // function to call API
  async function tryModel(modelName) {
    const apiURL = `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const response = await fetch(apiURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ]
      })
    });

    return await response.json();
  }

  // 1st try → Primary model
  let data = await tryModel(primaryModel);

  if (data.error?.code === 503) {
    console.log("⚠️ Gemini 2.5 overloaded → retrying in 1 sec...");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Retry primary
    data = await tryModel(primaryModel);
  }

  // If still error → fallback
  if (data.error?.code === 503) {
    console.log("❗ Switching to backup model gemini-1.5-flash...");
    data = await tryModel(fallbackModel);
  }

  return data;
}

router.post("/tips", async (req, res) => {
  try {
    const { crop, soil, issue } = req.body;

    if (!crop || !soil || !issue) {
      return res.status(400).json({
        success: false,
        message: "crop, soil and issue fields are required."
      });
    }

    const prompt = `
Give detailed, structured, farmer-friendly organic farming tips for:

Crop: ${crop}
Soil Type: ${soil}
Major Issue: ${issue}

Include:
- Organic fertilizer alternatives
- Natural pest/disease control
- Soil improvement methods
- Homemade organic solutions
- Companion planting
- Water management
- Action steps

Use very simple language.
`;

    // CALL GEMINI (with retry)
    const data = await callGemini(prompt);

    console.log("Gemini RAW Response >>>", data);

    const aiText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      data?.candidates?.[0]?.content?.parts?.[0]?.raw_text ||
      null;

    if (!aiText) {
      return res.json({
        success: false,
        message: "AI returned no text. Please try again."
      });
    }

    return res.json({
      success: true,
      tips: aiText
    });

  } catch (error) {
    console.error("Organic Tips Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while generating organic tips."
    });
  }
});

export default router;
