import axios from "axios";

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://localhost:8000";

export const predictCrop = async (inputData) => {
  try {
    const response = await axios.post(`${ML_SERVICE_URL}/predict`, inputData, {
      timeout: 8000, // 8 sec timeout
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error contacting ML service:", error.message);

    return {
      status: "failed",
      error: "ML Service unreachable",
      recommended_crop: null,
      confidence: null,
      fallback: true
    };
  }
};
