import { useState } from "react";
import { HiBeaker, HiChartBar, HiCloud, HiFire } from "react-icons/hi";

export default function CropRecommendation() {
  const [formData, setFormData] = useState({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: ""
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/crop/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          N: Number(formData.N),
          P: Number(formData.P),
          K: Number(formData.K),
          temperature: Number(formData.temperature),
          humidity: Number(formData.humidity),
          ph: Number(formData.ph),
          rainfall: Number(formData.rainfall)
        })
      });

      const data = await res.json();

      if (!data.success) {
        setError("Prediction failed. Please try again.");
      } else {
        setResult(data.data);
      }

    } catch (err) {
      setError("Server error. Please check your connection.");
    }

    setLoading(false);
  };

  const inputFields = [
    { name: "N", label: "Nitrogen (N)", icon: HiFire, unit: "ppm", placeholder: "0-140" },
    { name: "P", label: "Phosphorus (P)", icon: HiChartBar, unit: "ppm", placeholder: "5-145" },
    { name: "K", label: "Potassium (K)", icon: HiBeaker, unit: "ppm", placeholder: "5-205" },
    { name: "temperature", label: "Temperature", icon: HiFire, unit: "°C", placeholder: "8-44" },
    { name: "humidity", label: "Humidity", icon: "💧", unit: "%", placeholder: "14-100" },
    { name: "ph", label: "pH Level", icon: HiChartBar, unit: "pH", placeholder: "3.5-9.5" },
    { name: "rainfall", label: "Rainfall", icon: HiCloud, unit: "mm", placeholder: "20-300" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-3xl text-white shadow-lg mx-auto mb-4">
            🌾
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
            Smart Crop Recommendation
          </h1>
          <p className="text-gray-600 text-lg">
            Enter your soil and weather details to get AI-powered crop suggestions
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-md border border-white/50 p-6 lg:p-8 mb-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {inputFields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <label className="flex items-center gap-2 font-semibold text-gray-700">
                    {typeof field.icon === 'string' ? (
                      <span>{field.icon}</span>
                    ) : (
                      <field.icon className="text-green-600" />
                    )}
                    {field.label}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required
                      step="any"
                      className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 transition-all duration-300 hover:bg-white"
                      placeholder={field.placeholder}
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                      {field.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-lg transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Analyzing Soil Data...
                </>
              ) : (
                <>
                  <HiChartBar className="text-xl" />
                  Get Crop Recommendation
                </>
              )}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white">
                ⚠️
              </div>
              <div>
                <h3 className="font-semibold text-red-800">Prediction Error</h3>
                <p className="text-red-600 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl shadow-md border border-green-100 p-6 lg:p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg mx-auto mb-4">
                ✅
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                Recommended Crop
              </h2>
              <p className="text-gray-600">Based on your soil and weather conditions</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-200">
              <div className="text-center">
                <div className="text-5xl mb-4">🌱</div>
                <h3 className="text-3xl font-bold text-green-700 mb-2">
                  {result.recommended_crop}
                </h3>
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  {Math.round(result.confidence * 100)}% Confidence
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Source: {result.fallback ? "Rule-Based System" : "AI Model"}
                  </span>
                  <span>•</span>
                  <span>Real-time Analysis</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <button className="bg-white border border-green-500 text-green-600 py-3 rounded-xl font-semibold hover:bg-green-50 transition-all duration-300 transform">
                View Crop Details
              </button>
              <button className="bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 transform">
                Save Recommendation
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}