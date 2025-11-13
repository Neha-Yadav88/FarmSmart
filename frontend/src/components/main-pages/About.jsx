import { useState, useEffect } from "react";

export default function About() {
  const [visibleStats, setVisibleStats] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleStats(true);
        }
      },
      { threshold: 0.3 }
    );

    const aboutSection = document.getElementById('about');
    if (aboutSection) observer.observe(aboutSection);

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: "🌱",
      title: "Smart Crop Planning",
      description: "AI-powered crop recommendations based on soil type, season, and market demand"
    },
    {
      icon: "💧",
      title: "Precision Irrigation",
      description: "Optimal water usage recommendations using soil moisture data and weather forecasts"
    },
    {
      icon: "🐛",
      title: "Pest Detection",
      description: "Real-time pest and disease identification using image recognition AI"
    },
    {
      icon: "📊",
      title: "Data Analytics",
      description: "Comprehensive farm data analysis for better decision making"
    }
  ];


  return (
    <section
      id="about"
      className="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-br from-white via-green-50 to-emerald-50"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-1/4 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute right-0 bottom-1/4 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute left-1/2 bottom-0 w-64 h-64 bg-lime-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADING - Enhanced */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Revolutionizing Agriculture with AI
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent">
              Smarter Farming,
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
              Better Harvest
            </span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Transforming traditional farming with intelligent AI solutions that help farmers 
            make data-driven decisions for increased productivity and sustainable agriculture.
          </p>
        </div>

        {/* CONTENT GRID */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center mb-20">
          
          {/* LEFT SIDE - Enhanced Visual */}
          <div className="relative">
            {/* Main Image Container */}
            <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 transform hover:scale-105 transition-all duration-500">
              <div className="grid grid-cols-2 gap-6">
                {/* Farmer with Tech */}
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-6 text-center group hover:shadow-lg transition-all duration-300">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">👨‍🌾</span>
                  </div>
                  <p className="font-semibold text-green-800">Modern Farmer</p>
                </div>
                
                {/* AI Technology */}
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-6 text-center group hover:shadow-lg transition-all duration-300">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">🤖</span>
                  </div>
                  <p className="font-semibold text-blue-800">AI Assistant</p>
                </div>
                
                {/* Crops */}
                <div className="bg-gradient-to-br from-yellow-100 to-amber-100 rounded-2xl p-6 text-center group hover:shadow-lg transition-all duration-300">
                  <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">🌾</span>
                  </div>
                  <p className="font-semibold text-amber-800">Healthy Crops</p>
                </div>
                
                {/* Analytics */}
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6 text-center group hover:shadow-lg transition-all duration-300">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">📈</span>
                  </div>
                  <p className="font-semibold text-purple-800">Smart Analytics</p>
                </div>
              </div>
              
              {/* Central Connection */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-2xl border-4 border-green-500 flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-yellow-400/20 rounded-3xl rotate-12 animate-float"></div>
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-green-400/20 rounded-3xl -rotate-12 animate-float animation-delay-2000"></div>
          </div>

          {/* RIGHT TEXT CONTENT - Enhanced */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                Your AI Farming Partner
              </h3>

              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-8">
                We combine cutting-edge Artificial Intelligence, Machine Learning, and real-time 
                data analytics to revolutionize traditional farming practices. From intelligent 
                crop selection to precision resource management, our platform empowers farmers 
                with actionable insights for sustainable and profitable agriculture.
              </p>
            </div>

            {/* Features List - Enhanced */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-lg border border-white/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-green-800 mb-2">{feature.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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