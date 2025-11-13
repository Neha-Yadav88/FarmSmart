import { useState, useEffect } from "react";

export default function Workflow() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('workflow');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      title: "Enter Farm Details",
      desc: "Provide basic information like location, soil type, crop preference, and farm size for personalized recommendations.",
      icon: "📍",
      subSteps: ["Location details", "Soil type", "Crop preference", "Farm size"],
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "AI Data Processing",
      desc: "Our intelligent system analyzes soil composition, weather patterns, NPK levels, and historical farming data using advanced AI/ML models.",
      icon: "🤖",
      subSteps: ["Soil analysis", "Weather patterns", "NPK levels", "Historical data"],
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Smart Recommendations",
      desc: "Receive AI-powered suggestions for suitable crops, optimized fertilizer plans, irrigation schedules, and early pest detection alerts.",
      icon: "💡",
      subSteps: ["Crop selection", "Fertilizer plan", "Irrigation schedule", "Pest alerts"],
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Monitor & Optimize",
      desc: "Track your farm's health in real-time with weather updates, growth monitoring, and continuous optimization suggestions.",
      icon: "📊",
      subSteps: ["Real-time monitoring", "Growth tracking", "Weather alerts", "Optimization tips"],
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-50"
    },
    {
      title: "Achieve Better Yield",
      desc: "Implement data-driven decisions to significantly increase productivity, reduce crop losses, and maximize your farming profits.",
      icon: "🚀",
      subSteps: ["Increased yield", "Reduced losses", "Higher profits", "Sustainable farming"],
      color: "from-red-500 to-pink-600",
      bgColor: "bg-red-50"
    }
  ];

  return (
    <section id="workflow" className="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-br from-white via-green-50 to-emerald-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-lime-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Heading - Enhanced */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Simple & Effective Process
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent">
              How Smart Farming
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
              Works For You
            </span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Follow these simple steps to transform your farming experience with AI-powered insights 
            and data-driven decisions for better results.
          </p>
        </div>

        {/* Mobile Steps Selector */}
        <div className="lg:hidden mb-8">
          <div className="flex overflow-x-auto pb-4 gap-3 scrollbar-hide">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`flex-shrink-0 px-4 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  activeStep === index
                    ? `bg-gradient-to-r ${step.color} text-white shadow-lg`
                    : `${step.bgColor} text-gray-700 shadow-md hover:shadow-lg`
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{step.icon}</span>
                  <span className="text-sm">Step {index + 1}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          
          {/* Main Timeline Line */}
          <div className="absolute left-4 lg:left-1/2 lg:transform lg:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 to-emerald-500 hidden lg:block rounded-full"></div>
          
          {/* Steps */}
          <div className="space-y-8 lg:space-y-20">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative lg:flex items-center gap-8 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } transition-all duration-700`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Content Box - Enhanced */}
                <div className={`lg:w-1/2 ${
                  index % 2 === 0 ? "lg:pr-8" : "lg:pl-8"
                }`}>
                  <div 
                    onMouseEnter={() => setActiveStep(index)}
                    className={`bg-white/80 backdrop-blur-sm rounded-3xl p-6 lg:p-8 shadow-xl border border-white/50 hover:shadow-lg transition-all duration-500 transform hover:scale-105 cursor-pointer ${
                      activeStep === index ? 'ring-2 ring-green-500 ring-opacity-50' : ''
                    }`}
                  >
                    {/* Step Number */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-xl lg:text-2xl font-bold text-gray-800">
                          {step.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-2xl">{step.icon}</span>
                          <span className="text-sm text-gray-500">Step {index + 1}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                      {step.desc}
                    </p>

                  </div>
                </div>

                {/* Icon Circle - Enhanced */}
                <div className="lg:w-1/2 flex justify-center lg:justify-center mt-6 lg:mt-0">
                  <div className="relative">
                    {/* Connecting Line Dots */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-500 rounded-full shadow-lg hidden lg:block"></div>
                    
                    {/* Main Icon Container */}
                    <div className={`relative w-24 h-24 lg:w-32 lg:h-32 rounded-3xl bg-gradient-to-r ${step.color} flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-300 group`}>
                      <span className="text-3xl lg:text-4xl text-white">{step.icon}</span>
                      
                      {/* Animated Ring */}
                      <div className="absolute inset-0 rounded-3xl border-4 border-white border-opacity-30 animate-ping-slow"></div>
                    </div>

                    {/* Progress Line */}
                    {index < steps.length - 1 && (
                      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-1 h-10 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full hidden lg:block"></div>
                    )}
                  </div>
                </div>

                {/* Mobile Progress Line */}
                <div className="absolute left-6 top-24 bottom-0 w-1 bg-gradient-to-b from-green-400 to-emerald-500 lg:hidden"></div>
              </div>
            ))}
          </div>

          {/* Start and End Points */}
          <div className="absolute left-4 lg:left-1/2 lg:transform lg:-translate-x-1/2 -top-4 w-4 h-4 bg-green-500 rounded-full shadow-lg hidden lg:block"></div>
          <div className="absolute left-4 lg:left-1/2 lg:transform lg:-translate-x-1/2 -bottom-4 w-4 h-4 bg-emerald-500 rounded-full shadow-lg hidden lg:block"></div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 lg:mt-20">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-md border border-white/50 max-w-2xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
              Ready to Start Your Smart Farming Journey?
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              Join thousands of farmers who are already benefiting from AI-powered agriculture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform flex items-center justify-center gap-3"
              >
                <span>Get Started Now</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="#tools"
                className="border-2 border-green-200 bg-white text-green-700 px-8 py-4 rounded-2xl font-semibold hover:border-green-300 transition-all duration-300 hover:scale-105 transform flex items-center justify-center gap-3"
              >
                <span>Explore Tools</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </a>
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
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}