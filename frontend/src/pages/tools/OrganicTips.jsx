import { useState, useEffect } from "react";
import { HiSparkles, HiBeaker, HiLightBulb } from "react-icons/hi";

export default function OrganicTips() {
  const [form, setForm] = useState({
    crop: "",
    soil: "",
    issue: ""
  });

  const [loading, setLoading] = useState(false);
  const [tips, setTips] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Typing animation effect
  const startTypingEffect = (fullText) => {
    setDisplayedText("");
    let index = 0;

    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + fullText[index]);
      index++;

      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 20);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setTips("");
    setDisplayedText("");

    if (!form.crop || !form.soil || !form.issue) {
      setError("Please select all fields to get organic farming tips.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/organic/tips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Unable to generate tips. Please try again.");
        setLoading(false);
        return;
      }

      setTips(data.tips);
      startTypingEffect(data.tips);

    } catch (err) {
      setError("Connection failed. Please check your internet connection.");
    }

    setLoading(false);
  };

  const cropOptions = [
    "Wheat", "Rice", "Maize", "Sugarcane", "Tomato", 
    "Potato", "Vegetables", "Pulses", "Cotton", "Soybean"
  ];

  const soilOptions = [
    "Loamy", "Sandy", "Clay", "Black", "Red", "Alluvial"
  ];

  const issueOptions = [
    "Low Nitrogen", "Low Phosphorus", "Low Potassium",
    "Soil Too Acidic", "Soil Too Alkaline", "Pest Problem",
    "Fungal Infection", "Low Moisture", "Poor Drainage",
    "Nutrient Deficiency", "Weed Management"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 to-green-50 p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-3xl text-white shadow-lg mx-auto mb-4">
            🌿
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
            Organic Farming Guide
          </h1>
          <p className="text-gray-600 text-lg">
            Get AI-powered organic solutions for your specific crop and soil conditions
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-md border border-white/50 p-6 lg:p-8 mb-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Crop Selection */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 font-semibold text-gray-700">
                  <span className="text-green-600">🌾</span>
                  Select Crop
                </label>
                <select
                  name="crop"
                  value={form.crop}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 transition-all duration-300 hover:bg-white"
                >
                  <option value="">Choose your crop</option>
                  {cropOptions.map(crop => (
                    <option key={crop} value={crop}>{crop}</option>
                  ))}
                </select>
              </div>

              {/* Soil Type */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 font-semibold text-gray-700">
                  <HiBeaker className="text-green-600" />
                  Soil Type
                </label>
                <select
                  name="soil"
                  value={form.soil}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 transition-all duration-300 hover:bg-white"
                >
                  <option value="">Select soil type</option>
                  {soilOptions.map(soil => (
                    <option key={soil} value={soil}>{soil}</option>
                  ))}
                </select>
              </div>

              {/* Issue */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 font-semibold text-gray-700">
                  <HiLightBulb className="text-green-600" />
                  Farming Issue
                </label>
                <select
                  name="issue"
                  value={form.issue}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 transition-all duration-300 hover:bg-white"
                >
                  <option value="">Choose the issue</option>
                  {issueOptions.map(issue => (
                    <option key={issue} value={issue}>{issue}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Generating Organic Solutions...
                </>
              ) : (
                <>
                  <HiSparkles className="text-xl" />
                  Get Organic Tips
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
                <h3 className="font-semibold text-red-800">Unable to Generate Tips</h3>
                <p className="text-red-600 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Selected Options Preview */}
        {(form.crop || form.soil || form.issue) && !tips && !loading && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
            <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
              <HiLightBulb className="text-blue-600" />
              Selected Parameters
            </h3>
            <div className="flex flex-wrap gap-4">
              {form.crop && (
                <span className="bg-white text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200">
                  🌾 {form.crop}
                </span>
              )}
              {form.soil && (
                <span className="bg-white text-amber-700 px-4 py-2 rounded-full text-sm font-medium border border-amber-200">
                  🏺 {form.soil}
                </span>
              )}
              {form.issue && (
                <span className="bg-white text-red-700 px-4 py-2 rounded-full text-sm font-medium border border-red-200">
                  ⚠️ {form.issue}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Tips Output */}
        {displayedText && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl shadow-md border border-green-100 p-6 lg:p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-xl text-white shadow-lg">
                💡
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                  Organic Solutions
                </h2>
                <p className="text-gray-600">AI-powered recommendations for your farm</p>
              </div>
            </div>

            {/* Chat-style output */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  AI
                </div>
                <div className="flex-1">
                  <div className="text-gray-700 leading-7 whitespace-pre-line font-medium">
                    {displayedText}
                    <span className="animate-pulse text-green-600 font-bold">▌</span>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-gray-200">
                    <button className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-green-200 transition-colors">
                      Save Tips
                    </button>
                    <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-200 transition-colors">
                      Print Guide
                    </button>
                    <button className="bg-amber-100 text-amber-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-amber-200 transition-colors">
                      Share with Farmer
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Resources */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white rounded-xl p-4 text-center border border-green-200">
                <div className="text-2xl mb-2">📚</div>
                <div className="text-sm font-semibold text-gray-800">Learn More</div>
                <div className="text-xs text-gray-600">Organic farming guides</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center border border-green-200">
                <div className="text-2xl mb-2">🎥</div>
                <div className="text-sm font-semibold text-gray-800">Watch Videos</div>
                <div className="text-xs text-gray-600">Practical demonstrations</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center border border-green-200">
                <div className="text-2xl mb-2">👨‍🌾</div>
                <div className="text-sm font-semibold text-gray-800">Expert Help</div>
                <div className="text-xs text-gray-600">Connect with specialists</div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-3xl shadow-md border border-white/50 p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg mx-auto mb-4">
              <HiSparkles />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Generating Organic Solutions
            </h3>
            <p className="text-gray-600 mb-4">
              Analyzing your crop, soil, and issue for the best organic recommendations...
            </p>
            <div className="w-24 h-1 bg-gray-200 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full animate-pulse"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}