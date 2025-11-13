import { useState, useEffect } from "react";

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('features');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      title: "AI Crop Recommendation",
      icon: "🌱",
      desc: "Intelligent crop suggestions based on soil analysis, weather patterns, and regional suitability for maximum yield.",
      color: "green",
      stats: "95% Accuracy"
    },
    {
      title: "Soil Health Analysis",
      icon: "🔍",
      desc: "Comprehensive soil testing including pH levels, nutrient content, moisture retention, and organic matter.",
      color: "amber",
      stats: "Real-time Data"
    },
    {
      title: "Fertilizer Guidance",
      icon: "🧪",
      desc: "Precision fertilizer recommendations with optimal timing and quantity for healthy crop growth.",
      color: "blue",
      stats: "Save 30% Costs"
    },
    {
      title: "AI Chatbot",
      icon: "🤖",
      desc: "24/7 farming assistant providing instant answers to all your agriculture-related queries.",
      color: "purple",
      stats: "24/7 Support"
    },
  ];

  const colorClasses = {
    green: { gradient: "from-green-500 to-emerald-600", bg: "bg-green-50", text: "text-green-700" },
    amber: { gradient: "from-amber-500 to-orange-600", bg: "bg-amber-50", text: "text-amber-700" },
    blue: { gradient: "from-blue-500 to-cyan-600", bg: "bg-blue-50", text: "text-blue-700" },
    red: { gradient: "from-red-500 to-pink-600", bg: "bg-red-50", text: "text-red-700" },
    sky: { gradient: "from-sky-500 to-blue-600", bg: "bg-sky-50", text: "text-sky-700" },
    emerald: { gradient: "from-emerald-500 to-green-600", bg: "bg-emerald-50", text: "text-emerald-700" },
    purple: { gradient: "from-purple-500 to-indigo-600", bg: "bg-purple-50", text: "text-purple-700" },
    cyan: { gradient: "from-cyan-500 to-blue-600", bg: "bg-cyan-50", text: "text-cyan-700" },
  };

  return (
    <section id="features" className="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-br from-white via-green-50 to-emerald-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-lime-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Heading - Enhanced */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Why Choose Smart Farming Assistant?
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent">
              Revolutionary
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
              Farming Features
            </span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the future of agriculture with our intelligent features designed to 
            maximize your yield and simplify farming operations.
          </p>
        </div>

        {/* Interactive Features Layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Side - Feature Selector */}
          <div className="lg:col-span-5">
            <div className="space-y-4">
              {features.map((feature, index) => {
                const color = colorClasses[feature.color];
                return (
                  <button
                    key={index}
                    onClick={() => setActiveFeature(index)}
                    className={`w-full text-left p-6 rounded-2xl transition-all duration-500 transform hover:scale-105 ${
                      activeFeature === index
                        ? `bg-white shadow-md border-l-4 border-l-${feature.color}-500`
                        : `${color.bg} shadow-lg hover:shadow-xl`
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${color.gradient} flex items-center justify-center text-2xl text-white shadow-lg`}>
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-lg font-bold ${activeFeature === index ? 'text-gray-800' : color.text} mb-2`}>
                          {feature.title}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                            activeFeature === index 
                              ? `bg-${feature.color}-100 text-${feature.color}-700`
                              : 'bg-white/80 text-gray-600'
                          }`}>
                            {feature.stats}
                          </span>
                          {activeFeature === index && (
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Side - Feature Showcase */}
          <div className="lg:col-span-7">
            <div className={`bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-md border border-white/50 transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${colorClasses[features[activeFeature].color].gradient} flex items-center justify-center text-3xl text-white shadow-lg`}>
                  {features[activeFeature].icon}
                </div>
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                    {features[activeFeature].title}
                  </h3>
                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    {features[activeFeature].stats}
                  </div>
                </div>
              </div>

              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed mb-8">
                {features[activeFeature].desc}
              </p>

              {/* Feature Benefits */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  "Real-time Data Analysis",
                  "AI-Powered Insights",
                  "Easy to Use Interface",
                  "24/7 Availability"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform flex items-center justify-center gap-3 group">
                <span>Try {features[activeFeature].title}</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeFeature === index
                      ? `bg-${features[index].color}-500 scale-125`
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
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