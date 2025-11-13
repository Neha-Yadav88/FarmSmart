import { useState } from "react";
import { HiBeaker, HiChartBar, HiColorSwatch, HiTrendingUp } from "react-icons/hi";

export default function SoilAnalysis() {
  const [formData, setFormData] = useState({
    soilType: "",
    soilColor: "",
    texture: "",
    ph: "",
    N: "",
    P: "",
    K: "",
    moisture: ""
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
      const res = await fetch("http://localhost:5000/api/soil/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          soilType: formData.soilType,
          soilColor: formData.soilColor,
          texture: formData.texture,
          ph: Number(formData.ph),
          N: Number(formData.N),
          P: Number(formData.P),
          K: Number(formData.K),
          moisture: Number(formData.moisture)
        })
      });

      const data = await res.json();

      if (!data.success) {
        setError("Analysis failed. Please check your input.");
      } else {
        setResult(data.data);
      }
    } catch (err) {
      setError("Server error — please check your connection.");
    }

    setLoading(false);
  };

  const soilOptions = {
    soilType: [
      { value: "loamy", label: "Loamy" },
      { value: "sandy", label: "Sandy" },
      { value: "clay", label: "Clay" },
      { value: "black", label: "Black" },
      { value: "red", label: "Red" },
      { value: "alluvial", label: "Alluvial" }
    ],
    soilColor: [
      { value: "dark brown", label: "Dark Brown" },
      { value: "light brown", label: "Light Brown" },
      { value: "black", label: "Black" },
      { value: "red", label: "Red" },
      { value: "yellowish", label: "Yellowish" }
    ],
    texture: [
      { value: "fine", label: "Fine" },
      { value: "medium", label: "Medium" },
      { value: "coarse", label: "Coarse" }
    ]
  };

  const numericFields = [
    { name: "ph", label: "pH Level", unit: "pH", placeholder: "3.5-9.5" },
    { name: "N", label: "Nitrogen (N)", unit: "ppm", placeholder: "0-140" },
    { name: "P", label: "Phosphorus (P)", unit: "ppm", placeholder: "5-145" },
    { name: "K", label: "Potassium (K)", unit: "ppm", placeholder: "5-205" },
    { name: "moisture", label: "Moisture", unit: "%", placeholder: "0-100" }
  ];

  const getStatusColor = (status) => {
    const statusColors = {
      "Excellent": "text-green-600 bg-green-100",
      "Good": "text-blue-600 bg-blue-100",
      "Moderate": "text-yellow-600 bg-yellow-100",
      "Poor": "text-orange-600 bg-orange-100",
      "Critical": "text-red-600 bg-red-100",
      "Low": "text-red-600 bg-red-100",
      "Medium": "text-yellow-600 bg-yellow-100",
      "High": "text-green-600 bg-green-100"
    };
    return statusColors[status] || "text-gray-600 bg-gray-100";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center text-3xl text-white shadow-lg mx-auto mb-4">
            🧪
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
            Soil Health Analysis
          </h1>
          <p className="text-gray-600 text-lg">
            Complete soil testing with AI-powered recommendations for better crop yield
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-md border border-white/50 p-6 lg:p-8 mb-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Soil Type */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 font-semibold text-gray-700">
                  <HiTrendingUp className="text-amber-600" />
                  Soil Type
                </label>
                <select
                  name="soilType"
                  value={formData.soilType}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-gray-50 transition-all duration-300 hover:bg-white"
                >
                  <option value="">Select Soil Type</option>
                  {soilOptions.soilType.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Soil Color */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 font-semibold text-gray-700">
                  <HiColorSwatch className="text-amber-600" />
                  Soil Color
                </label>
                <select
                  name="soilColor"
                  value={formData.soilColor}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-gray-50 transition-all duration-300 hover:bg-white"
                >
                  <option value="">Select Color</option>
                  {soilOptions.soilColor.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Texture */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 font-semibold text-gray-700">
                  <HiBeaker className="text-amber-600" />
                  Texture
                </label>
                <select
                  name="texture"
                  value={formData.texture}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-gray-50 transition-all duration-300 hover:bg-white"
                >
                  <option value="">Select Texture</option>
                  {soilOptions.texture.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Numeric Inputs */}
              {numericFields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <label className="flex items-center gap-2 font-semibold text-gray-700">
                    <HiChartBar className="text-amber-600" />
                    {field.label}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required={field.name !== "moisture"}
                      step="any"
                      className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-gray-50 transition-all duration-300 hover:bg-white"
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
              className="w-full mt-8 bg-gradient-to-r from-amber-500 to-orange-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Analyzing Soil Samples...
                </>
              ) : (
                <>
                  <HiBeaker className="text-xl" />
                  Analyze Soil Health
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
                <h3 className="font-semibold text-red-800">Analysis Error</h3>
                <p className="text-red-600 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl shadow-md border border-amber-100 p-6 lg:p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg mx-auto mb-4">
                📊
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                Soil Health Report
              </h2>
              <p className="text-gray-600">Comprehensive analysis of your soil quality</p>
            </div>

            {/* Soil Health Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-200 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Basic Info */}
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                    <span>🌍</span> Basic Properties
                  </h3>
                  <div className="space-y-2">
                    <p><span className="font-semibold">Type:</span> {result.soilType}</p>
                    <p><span className="font-semibold">Color:</span> {result.soilColor}</p>
                    <p><span className="font-semibold">Texture:</span> {result.texture}</p>
                  </div>
                </div>

                {/* Fertility Score */}
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                    <span>⭐</span> Fertility Score
                  </h3>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-600 mb-1">
                      {result.fertilityScore}/100
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${result.fertilityScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* pH Status */}
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                    <span>🧪</span> pH Analysis
                  </h3>
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold text-center ${getStatusColor(result.phAnalysis.status)}`}>
                    {result.phAnalysis.status}
                  </div>
                </div>

                {/* Nutrients */}
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                    <span>🌱</span> Nutrients
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>N:</span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(result.nutrients.N.status)}`}>
                        {result.nutrients.N.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>P:</span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(result.nutrients.P.status)}`}>
                        {result.nutrients.P.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>K:</span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(result.nutrients.K.status)}`}>
                        {result.nutrients.K.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Suitable Crops */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-200">
                <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                  <span>🌾</span> Suitable Crops
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.suitableCrops.map((crop, index) => (
                    <span key={index} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      {crop}
                    </span>
                  ))}
                </div>
              </div>

              {/* Deficiencies */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-200">
                <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                  <span>⚠️</span> Deficiencies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.deficiencies.map((def, index) => (
                    <span key={index} className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                      {def}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommendations List */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-200 mt-6">
              <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                <span>💡</span> Recommendations
              </h3>
              <ul className="space-y-3">
                {result.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}