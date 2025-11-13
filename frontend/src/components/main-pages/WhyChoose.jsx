export default function WhyChoose() {
  const features = [
    {
      title: "Accurate AI Recommendations",
      desc: "Our platform uses advanced machine learning models to analyze soil, weather, and regional patterns to recommend the perfect crop for maximum yield.",
      icon: "https://cdn-icons-png.flaticon.com/512/2907/2907284.png",
    },
    {
      title: "Real-Time Insights",
      desc: "Get updated weather forecasts, pest alerts, soil conditions, and irrigation suggestions instantly—helping you make timely decisions.",
      icon: "https://cdn-icons-png.flaticon.com/512/3262/3262918.png",
    },
    {
      title: "Farmer-Friendly & Easy to Use",
      desc: "Built with simplicity in mind. Every tool, insight, and recommendation is presented in easy language for all farmers to understand.",
      icon: "https://cdn-icons-png.flaticon.com/512/992/992700.png",
    },
    {
      title: "Complete Smart Farming Solution",
      desc: "From crop selection to fertilizer guidance, pest detection, weather forecasting, and yield prediction—everything in one platform.",
      icon: "https://cdn-icons-png.flaticon.com/512/3523/3523063.png",
    },
    {
      title: "Data-Driven Decision Making",
      desc: "No guesswork. Every suggestion is backed by real-time data, agricultural research, and AI-based analysis.",
      icon: "https://cdn-icons-png.flaticon.com/512/3135/3135706.png",
    },
    {
      title: "Boost Yield & Reduce Loss",
      desc: "Our system helps farmers increase productivity, prevent crop damage, and reduce fertilizer & pesticide wastage.",
      icon: "https://cdn-icons-png.flaticon.com/512/2907/2907279.png",
    },
  ];

  return (
    <section id="whychoose" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-green-800">
            Why Choose Our System?
          </h2>
          <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
            Smart Farming Assistant brings together AI, machine learning, and real-time agriculture insights to help farmers grow smarter, faster, and better.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-green-50 p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition transform duration-300 border border-green-100"
            >
              <img
                src={item.icon}
                alt={item.title}
                className="w-16 mb-4 drop-shadow-md animate-fadeIn"
              />

              <h3 className="text-2xl font-bold text-green-700 mb-3">
                {item.title}
              </h3>

              <p className="text-gray-700 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
