import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaSeedling } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Tools", href: "#tools" },
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#workflow" },
    { name: "Contact", href: "#contact" }
  ];

  const smartTools = [
    "Crop Recommendation",
    "Soil Analysis",
    "Fertilizer Guide",
    "Pest Detection",
    "Weather Forecast",
    "Market Prices",
    "AI Chatbot",
    "Irrigation Guide"
  ];

  const socialLinks = [
    { icon: FaFacebook, href: "#", color: "hover:text-blue-400" },
    { icon: FaTwitter, href: "#", color: "hover:text-sky-400" },
    { icon: FaInstagram, href: "#", color: "hover:text-pink-400" },
    { icon: FaLinkedin, href: "#", color: "hover:text-blue-500" },
    { icon: FaYoutube, href: "#", color: "hover:text-red-500" }
  ];

  const contactInfo = [
    { icon: MdEmail, text: "support@smartfarming.com" },
    { icon: MdPhone, text: "+91 98765 43210" },
    { icon: MdLocationOn, text: "Punjab, India" }
  ];

  return (
    <footer id="contact" className="relative overflow-hidden bg-gradient-to-br from-green-900 via-emerald-900 to-green-800 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Top Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Column - Brand & Description */}
          <div className="space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-400 rounded-2xl flex items-center justify-center shadow-lg">
                <FaSeedling className="text-2xl text-white" />
              </div>
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
                  FarmSmart AI
                </h2>
                <p className="text-green-200 text-sm">Intelligent Farming Solutions</p>
              </div>
            </div>

            <p className="text-green-100 leading-relaxed text-lg max-w-2xl">
              Revolutionizing agriculture with AI-powered insights. Our platform helps farmers make 
              data-driven decisions for better crop yield, soil health, and sustainable farming practices.
            </p>

            {/* Newsletter Subscription */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Stay Updated</h3>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl bg-green-800 border border-green-600 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                />
                <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            
            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-green-100 hover:text-white transition-all duration-300 hover:translate-x-2 transform flex items-center gap-2 group"
                    >
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Smart Tools */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                Our Tools
              </h3>
              <ul className="space-y-3">
                {smartTools.map((tool, index) => (
                  <li key={index}>
                    <a 
                      href="#tools"
                      className="text-green-100 hover:text-white transition-all duration-300 hover:translate-x-2 transform flex items-center gap-2 group"
                    >
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      {tool}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                Contact Us
              </h3>
              <ul className="space-y-4">
                {contactInfo.map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-green-100 group hover:text-white transition-colors duration-300">
                    <div className="w-10 h-10 bg-green-800 rounded-lg flex items-center justify-center group-hover:bg-green-700 transition-colors duration-300">
                      <item.icon className="text-lg text-green-300" />
                    </div>
                    <span className="text-sm">{item.text}</span>
                  </li>
                ))}
              </ul>

              {/* Social Media */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-4 text-white">Follow Us</h4>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className={`w-12 h-12 bg-green-800 px-3 rounded-xl flex items-center justify-center text-xl text-green-300 transition-all duration-300 hover:scale-110 transform ${social.color} hover:bg-green-700`}
                    >
                      <social.icon />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative z-10 border-t border-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            
            {/* Copyright */}
            <div className="text-green-200 text-center lg:text-left">
              <p className="flex items-center gap-2 justify-center lg:justify-start">
                <span>© {new Date().getFullYear()} FarmSmart AI.</span>
                <span>All rights reserved.</span>
              </p>
            </div>

            {/* Additional Links */}
            <div className="flex flex-wrap justify-center gap-6 text-green-200 text-sm">
              <a href="#" className="hover:text-white transition-colors duration-300 hover:underline">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors duration-300 hover:underline">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors duration-300 hover:underline">
                Cookie Policy
              </a>
              <a href="#" className="hover:text-white transition-colors duration-300 hover:underline">
                Disclaimer
              </a>
            </div>

            {/* Made with Love */}
            <div className="text-green-200 text-sm flex items-center gap-2">
              <span>Made with</span>
              <div className="text-red-400 animate-pulse">❤️</div>
              <span>for Indian Farmers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-10 right-10 w-4 h-4 bg-green-400 rounded-full opacity-50 animate-ping"></div>
      <div className="absolute top-20 left-10 w-3 h-3 bg-emerald-400 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute top-1/2 right-20 w-2 h-2 bg-cyan-400 rounded-full opacity-40 animate-bounce"></div>
    </footer>
  );
}