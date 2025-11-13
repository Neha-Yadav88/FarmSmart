export default function Tools() {
  const tools = [
    {
      title: "Crop Recommendation",
      desc: "AI suggests best crops based on soil, weather, and region.",
      icon: "https://cdn-icons-png.flaticon.com/512/7662/7662852.png",
    },
    {
      title: "Soil Analysis",
      desc: "Analyze pH, NPK, moisture, and soil texture with AI.",
      icon: "https://cdn-icons-png.flaticon.com/512/3944/3944209.png",
    },
    {
      title: "Fertilizer Guide",
      desc: "Get ideal fertilizer type, quantity and timing.",
      icon: "https://cdn-icons-png.flaticon.com/512/4248/4248443.png",
    },
    {
      title: "Pest Detection",
      desc: "Detect pests & diseases using AI image analysis.",
      icon: "https://cdn-icons-png.flaticon.com/512/1785/1785428.png",
    },
    {
      title: "Weather Forecast",
      desc: "Real-time temperature, rain, wind & humidity updates.",
      icon: "https://cdn-icons-png.flaticon.com/512/1146/1146869.png",
    },
    {
      title: "AI Chatbot",
      desc: "Ask anything about crops, farming, soil, or pests.",
      icon: "https://cdn-icons-png.flaticon.com/512/1179/1179120.png",
    },
    {
      title: "Market Price Prediction",
      desc: "Track mandi rates & get future price predictions.",
      icon: "https://cdn-icons-png.flaticon.com/512/3135/3135706.png",
    },
    {
      title: "Smart Irrigation Guide",
      desc: "Get irrigation alerts & water requirement insights.",
      icon: "https://cdn-icons-png.flaticon.com/512/2904/2904747.png",
    },
  ];

  return (
    <section id="tools" className="py-20 bg-green-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-green-800">
            Smart Farming Tools
          </h2>
          <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
            Explore powerful AI tools designed to help farmers make smarter decisions.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 text-center 
                         hover:shadow-xl hover:-translate-y-2 
                         transition duration-300 transform border border-green-100"
            >
              <img
                src={tool.icon}
                alt={tool.title}
                className="w-20 mx-auto mb-4 drop-shadow-md animate-fadeIn"
              />

              <h3 className="text-xl font-bold text-green-700">
                {tool.title}
              </h3>

              <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                {tool.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
