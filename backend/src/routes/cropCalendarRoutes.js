import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
const router = express.Router();

// CALL GEMINI FUNCTION
async function callGemini(prompt) {
  const modelPrimary = "gemini-2.0-flash";
  const modelFallback = "gemini-2.5-flash";

  async function useModel(modelName) {
    const url = `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    return resp.json();
  }

  // Try primary model
  let data = await useModel(modelPrimary);

  if (data.error) {
    console.log("PRIMARY MODEL ERROR >>", data.error);
  }

  // If overloaded → retry fallback
  if (data.error?.code === 503) {
    console.log("Trying fallback model...");
    data = await useModel(modelFallback);
  }

  return data;
}

// ROUTE: Generate Crop Calendar
router.post("/calendar", async (req, res) => {
  try {
    const prompt = `
Generate a FULL YEARLY (January–December) crop calendar for India.
For each month include:
• 3–5 recommended crops
• Sowing & harvesting period
• 1 irrigation tip
• 1 organic fertilizer tip
• Weather caution (if needed)
Keep format clean:

January:
- Crop 1
- Crop 2
Tips: ...
-----

Simple, farmer-friendly language.
`;

    const data = await callGemini(prompt);

    console.log("Gemini Calendar RAW >>", data);

    const aiText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "";

    if (!aiText) {
      return res.json({
        success: false,
        message: "Gemini returned no crop calendar."
      });
    }

    return res.json({
      success: true,
      calendar: aiText
    });

  } catch (err) {
    console.error("Crop Calendar Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while generating crop calendar."
    });
  }
});

export default router;
