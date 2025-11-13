import { useState, useEffect } from "react";
import { HiMenu, HiX, HiChevronDown } from "react-icons/hi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ["hero", "about", "tools", "features", "contact"];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
      setActiveSection(id);
    }
  };

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "tools", label: "Explore Tools" },
    { id: "features", label: "Key Features" },
    { id: "contact", label: "Contact" }
  ];

  const features = [
    "Crop Recommendation",
    "Disease Detection",
    "Weather Forecast",
    "Soil Analysis",
    "Market Prices",
    "Expert Advice"
  ];

  return (
    <nav className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-white/95 shadow-md backdrop-blur-xl border-b border-green-100/50" 
        : "bg-gradient-to-r shadow-md from-green-50/80 to-emerald-50/80 backdrop-blur-lg"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          
          {/* LOGO - Enhanced */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => scrollToSection("hero")}
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                <span className="text-white font-bold text-lg">🌱</span>
              </div>
              <div className="absolute -inset-1 bg-green-400/20 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300"></div>
            </div>
            <div>
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                FarmSmart
              </h1>
              <p className="text-sm text-green-600/70 font-medium">AI Farming Assistant</p>
            </div>
          </div>

          {/* DESKTOP NAV LINKS - Enhanced */}
          <ul className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 rounded-xl font-semibold transition-all duration-300 group ${
                    activeSection === item.id
                      ? "text-green-700 bg-green-50/80 shadow-inner"
                      : "text-gray-700 hover:text-green-700 hover:bg-white/50 hover:border-gray-500"
                  }`}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 rounded-full transition-all duration-300 ${
                    activeSection === item.id ? "scale-100" : "scale-0 group-hover:scale-100"
                  }`}></span>
                </button>
              </li>
            ))}
          </ul>

          {/* DESKTOP CTA BUTTON - Enhanced */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="/login"
              className="relative bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group overflow-hidden"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </div>

          {/* MOBILE MENU BUTTON - Enhanced */}
          <button
            className="lg:hidden relative w-12 h-12 flex items-center justify-center rounded-xl bg-white/80 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <HiX className="text-2xl text-green-700" />
            ) : (
              <HiMenu className="text-2xl text-green-700" />
            )}
          </button>
        </div>

        {/* MOBILE MENU - Enhanced */}
        <div className={`lg:hidden transition-all duration-500 overflow-hidden ${
          isOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"
        }`}>
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-green-100/50 p-6 mt-2">
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-between group ${
                      activeSection === item.id
                        ? "bg-green-50 text-green-700 shadow-inner"
                        : "text-gray-700 hover:bg-green-50/50"
                    }`}
                  >
                    <span>{item.label}</span>
                    <div className={`w-2 h-2 rounded-full bg-green-500 transition-all duration-300 ${
                      activeSection === item.id ? "scale-100" : "scale-0 group-hover:scale-100"
                    }`}></div>
                  </button>
                </li>
              ))}
              
              {/* Mobile Features Dropdown */}
              <li>
                <details className="group">
                  <summary className="w-full text-left px-4 py-3 rounded-xl font-semibold text-gray-700 hover:bg-green-50/50 transition-all duration-300 flex items-center justify-between cursor-pointer list-none">
                    <span>All Features</span>
                    <HiChevronDown className="text-green-600 transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <ul className="ml-4 mt-2 space-y-2 bg-green-50/30 rounded-xl p-3">
                    {features.map((item, i) => (
                      <li key={i} className="px-3 py-2 text-sm text-gray-600 hover:text-green-700 hover:bg-white/50 rounded-lg transition-all duration-300 cursor-pointer">
                        {item}
                      </li>
                    ))}
                  </ul>
                </details>
              </li>

              {/* Mobile CTA Button */}
              <li className="pt-2">
                <a
                  href="/login"
                  className="block w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-center py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Start Farming Smart
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}