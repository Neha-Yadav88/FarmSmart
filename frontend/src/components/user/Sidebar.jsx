import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  HiHome, 
  HiChartBar, 
  HiBeaker, 
  HiChat, 
  HiUser, 
  HiCog, 
  HiLogout,
  HiMenu,
  HiX 
} from "react-icons/hi";

export default function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      name: "Main Dashboard",
      path: "/dashboard",
      icon: HiHome,
      description: "Overview & Analytics"
    },
    {
      name: "Crop Recommendation",
      path: "/dashboard/crop-recommendation",
      icon: HiChartBar,
      description: "AI Crop Suggestions"
    },
    {
      name: "Soil Analysis",
      path: "/dashboard/soil-analysis",
      icon: HiBeaker,
      description: "Soil Health Report"
    },
    {
      name: "Organic Farming Tips",
      path: "/dashboard/organic-tips",
      icon: "🌱",
      description: "Sustainable Practices"
    },
    {
      name: "Crop Calendar",
      path: "/dashboard/crop-calendar",
      icon: "📅",
      description: "Planting Schedule"
    },
    {
      name: "AI Chat Assistant",
      path: "/dashboard/assistant",
      icon: HiChat,
      description: "24/7 Farming Help"
    },
    {
      name: "Profile",
      path: "/dashboard/profile",
      icon: HiUser,
      description: "Account Settings"
    },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 "
        >
          {isMobileOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-80 bg-gradient-to-b from-green-900 via-emerald-900 to-green-800 text-white
        transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        shadow-md lg:shadow-xl
      `}>
        <div className="flex flex-col h-full">
          
          {/* Header */}
          <div className="p-6 border-b border-green-700">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-400 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🌾</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
                  FarmSmart AI
                </h1>
                <p className="text-green-200 text-sm">Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3 px-2 py-1 bg-green-800 rounded-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-200 text-sm">AI Assistant Active</span>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-6 overflow-y-auto">
            <ul className="space-y-3">
              {menuItems.map((item, index) => {
                const IconComponent = item.icon;
                const active = isActive(item.path);
                
                return (
                  <li key={index}>
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileOpen(false)}
                      className={`
                        flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group
                        ${active 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg text-white' 
                          : 'text-green-100 hover:bg-green-800 hover:shadow-md hover:scale-105'
                        }
                      `}
                    >
                      <div className={`
                        w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-300
                        ${active 
                          ? 'bg-white/20 text-white' 
                          : 'bg-green-800 text-green-300 group-hover:bg-green-700 group-hover:text-white'
                        }
                      `}>
                        {typeof IconComponent === 'string' ? (
                          <span>{IconComponent}</span>
                        ) : (
                          <IconComponent />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className={`font-semibold transition-colors duration-300 ${
                          active ? 'text-white' : 'text-green-50 group-hover:text-white'
                        }`}>
                          {item.name}
                        </div>
                      </div>

                      {/* Active Indicator */}
                      {active && (
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer Section */}
          <div className="p-6 border-t border-green-700 space-y-4">

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 p-4 text-red-300 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center text-xl group-hover:bg-red-500/30 transition-colors duration-300">
                <HiLogout />
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold">Logout</div>
                <div className="text-sm text-red-400/70 group-hover:text-red-400/90">Sign out from account</div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Overlay */}
        {isMobileOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-30"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        nav::-webkit-scrollbar {
          width: 6px;
        }
        nav::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        nav::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }
        nav::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </>
  );
}