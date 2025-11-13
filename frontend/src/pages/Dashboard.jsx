import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  HiUser, 
  HiLocationMarker, 
  HiPhone, 
  HiAcademicCap,
  HiChartBar,
  HiBeaker,
  HiSparkles,
  HiCalendar,
  HiChat,
  HiCloud,
  HiSun,
  HiArrowRight
} from "react-icons/hi";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiBase = import.meta.env.VITE_API_BASE || "";

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${apiBase}/api/auth/user`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setUser(data.user);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const quickActions = [
    {
      title: "Crop Recommendation",
      description: "AI-powered crop suggestions",
      icon: HiChartBar,
      link: "/dashboard/crop-recommendation",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Soil Analysis",
      description: "Comprehensive soil health report",
      icon: HiBeaker,
      link: "/dashboard/soil-analysis",
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-50"
    },
    {
      title: "Organic Tips",
      description: "Sustainable farming practices",
      icon: HiSparkles,
      link: "/dashboard/organic-tips",
      color: "from-lime-500 to-green-600",
      bgColor: "bg-lime-50"
    },
    {
      title: "Crop Calendar",
      description: "Optimal planting schedule",
      icon: HiCalendar,
      link: "/dashboard/crop-calendar",
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "AI Assistant",
      description: "24/7 farming guidance",
      icon: HiChat,
      link: "/dashboard/assistant",
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-50"
    }
  ];

  const weatherData = [
    { label: "Temperature", value: "27°C", icon: HiSun, color: "text-orange-500" },
    { label: "Rain Chance", value: "40%", icon: HiCloud, color: "text-blue-500" },
    { label: "Humidity", value: "62%", icon: "💧", color: "text-cyan-500" },
    { label: "Wind Speed", value: "12 km/h", icon: "🌬️", color: "text-gray-500" }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-green-700 font-semibold">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="text-center p-8 bg-white rounded-3xl shadow-md border border-green-100">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Session Expired</h2>
          <p className="text-gray-600 mb-4">Please login again to continue</p>
          <a 
            href="/login" 
            className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-white p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* WELCOME BANNER - Enhanced */}
        <div className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 text-white p-8 lg:p-12 rounded-3xl shadow-md overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25px 25px, white 2px, transparent 0)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>
          
          <div className="relative z-10">
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">
              Welcome back, <span className="bg-gradient-to-r from-amber-200 to-yellow-200 bg-clip-text text-transparent">{user.name}!</span> 👨‍🌾
            </h1>
            <p className="text-xl lg:text-2xl text-green-100 opacity-90 mb-6">
              Ready to grow smarter with AI-powered farming insights?
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                <span className="text-green-100">AI Assistant Active</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span className="text-green-100">📍 {user.location || "Update your location"}</span>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-4 right-8 text-6xl opacity-20">🌾</div>
          <div className="absolute bottom-4 left-8 text-4xl opacity-20">🚜</div>
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* USER PROFILE CARD - Enhanced */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-md border border-white/50 p-6 lg:p-8 hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
              {/* Profile Header */}
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-3xl text-white shadow-lg mx-auto">
                    <HiUser />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-4 border-white"></div>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mt-4">{user.name}</h2>
                <p className="text-gray-600 text-sm">{user.email}</p>
              </div>

              {/* User Details */}
              <div className="space-y-4">
              </div>
            </div>
          </div>

          {/* FARM OVERVIEW - Enhanced */}
          <div className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-md border border-white/50 p-6 lg:p-8 hover:shadow-3xl transition-all duration-500">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">🏠</span>
                </div>
                Farm Overview
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Primary Crop */}
                <div className="group bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 p-6 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center text-2xl text-white">
                      🌾
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 font-medium">Primary Crop</div>
                      <div className="text-xl font-bold text-gray-800">{user.primaryCrop || "Not set"}</div>
                    </div>
                  </div>
                </div>

                {/* Farm Area */}
                <div className="group bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 p-6 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center text-2xl text-white">
                      📐
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 font-medium">Farm Area</div>
                      <div className="text-xl font-bold text-gray-800">{user.farmArea || "0"} acres</div>
                    </div>
                  </div>
                </div>

                {/* Soil Type */}
                <div className="group bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 p-6 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-amber-500 rounded-xl flex items-center justify-center text-2xl text-white">
                      🧱
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 font-medium">Soil Type</div>
                      <div className="text-xl font-bold text-gray-800">{user.soilType || "Not analyzed"}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS - Enhanced */}
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">⚡</span>
            </div>
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="group"
              >
                <div className={`${action.bgColor} rounded-3xl p-6 shadow-lg border border-white/50 hover:shadow-md transition-all duration-500 transform hover:scale-105 h-full flex flex-col`}>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${action.color} flex items-center justify-center text-2xl text-white shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon />
                  </div>
                  
                  <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-gray-900 transition-colors">
                    {action.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm flex-1">
                    {action.description}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-4 text-gray-500 group-hover:text-gray-700 transition-colors">
                    <span className="text-sm font-medium">Explore</span>
                    <HiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}