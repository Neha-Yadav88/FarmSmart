import { useState, useEffect } from "react";

export default function Hero() {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ["Smarter", "Efficient", "Sustainable", "Profitable"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen w-full -mt-5 relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-lime-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* LEFT SIDE TEXT - Enhanced */}
        <div className="flex flex-col justify-center space-y-8 text-center lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium w-fit mx-auto lg:mx-0">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            AI-Powered Farming Solutions
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent">
                Farm{" "}
              </span>
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                  {words[currentWord]}
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transform origin-left transition-all duration-1000"></span>
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-2xl">
              Your intelligent farming partner. Get AI-powered crop recommendations, 
              real-time soil analysis, pest detection, and weather insights to maximize your yield.
            </p>
          </div>

          {/* Feature Points */}
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
            {[
              "🌱 Smart Crop Advice",
              "💧 Soil Health Analysis", 
              "🐛 Pest Detection",
              "🌤️ Weather Insights"
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-700 font-medium">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                {feature}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="#tools"
              className="group relative bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 transform flex items-center justify-center gap-3"
            >
              <span>Explore AI Tools</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>

            <a
              href="#about"
              className="group border-2 border-green-200 bg-white/50 backdrop-blur-sm text-green-700 px-8 py-4 rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 transform hover:border-green-300 flex items-center justify-center gap-3"
            >
              <span>Learn More</span>
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </a>
          </div>
        </div>

        {/* RIGHT SIDE - Modern Agriculture Illustration */}
        <div className="relative flex justify-center items-center">
          <div className="relative w-full max-w-2xl">
            {/* Main Container */}
            <div className="relative z-10 bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30 transform hover:scale-105 transition-all duration-500">
              {/* Modern Farming Scene */}
              <div className="relative w-full h-96 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl overflow-hidden">
                
                {/* Background Fields */}
                <div className="absolute inset-0">
                  {/* Sky */}
                  <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-blue-400 to-cyan-300"></div>
                  
                  {/* Fields */}
                  <div className="absolute top-1/3 left-0 w-full h-2/3 bg-gradient-to-b from-green-400 to-emerald-600"></div>
                  
                  {/* Field Patterns */}
                  <div className="absolute top-1/3 left-0 w-full h-8 bg-green-500"></div>
                  <div className="absolute top-2/3 left-0 w-full h-8 bg-emerald-700"></div>
                  
                  {/* Crop Rows */}
                  <div className="absolute top-40 left-0 w-full">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="h-4 bg-green-300 mb-2 opacity-60"></div>
                    ))}
                  </div>
                </div>

                {/* Farmer with Drone */}
                <div className="absolute bottom-10 left-10">
                  {/* Farmer */}
                  <div className="relative">
                    <div className="w-16 h-20 bg-blue-600 rounded-full flex items-end justify-center">
                      <div className="w-12 h-12 bg-yellow-400 rounded-full mb-1"></div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-800 rounded-full flex items-center justify-center text-white text-xs">
                      👨‍🌾
                    </div>
                  </div>
                </div>

                {/* Drone */}
                <div className="absolute top-20 right-20">
                  <div className="relative">
                    <div className="w-12 h-4 bg-gray-800 rounded-lg"></div>
                    <div className="absolute -top-4 left-2 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs">
                      🚁
                    </div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-1 h-6 bg-green-600"></div>
                  </div>
                </div>

                {/* Smart Tractor */}
                <div className="absolute bottom-8 right-10">
                  <div className="relative">
                    <div className="w-20 h-10 bg-red-500 rounded-lg"></div>
                    <div className="absolute -top-2 left-2 w-16 h-4 bg-red-600 rounded-lg"></div>
                    <div className="absolute -top-1 left-4 w-3 h-3 bg-yellow-300 rounded-full"></div>
                    <div className="absolute bottom-0 -left-2 w-6 h-6 bg-black rounded-full"></div>
                    <div className="absolute bottom-0 -right-2 w-6 h-6 bg-black rounded-full"></div>
                  </div>
                </div>

                {/* Weather Station */}
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
                  <div className="relative">
                    <div className="w-6 h-12 bg-gray-400 rounded-t-lg"></div>
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white rounded-full border-2 border-gray-300 flex items-center justify-center text-xs">
                      🌤️
                    </div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-gray-600"></div>
                  </div>
                </div>

                {/* Data Visualization */}
                <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold text-green-700">AI ACTIVE</span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Real-time Analysis</div>
                </div>

                {/* Crop Health Monitor */}
                <div className="absolute bottom-5 right-5 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                  <div className="text-xs font-bold text-green-700">CROP HEALTH</div>
                  <div className="flex gap-1 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </div>

              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-yellow-400/20 rounded-3xl rotate-12 animate-float"></div>
            <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-green-400/20 rounded-3xl -rotate-12 animate-float animation-delay-2000"></div>
            
            {/* Data Points */}
            <div className="absolute top-6 right-10 flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-semibold text-green-700">Live Data</span>
            </div>
            
            <div className="absolute bottom-6 left-10 flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-semibold text-blue-700">AI Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-green-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-green-400 rounded-full mt-2"></div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(12deg); }
          50% { transform: translateY(-20px) rotate(12deg); }
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}