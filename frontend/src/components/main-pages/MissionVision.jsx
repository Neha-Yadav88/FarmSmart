export default function MissionVision() {
  return (
    <section id="mission-vision" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-green-800">
            Our Mission & Vision
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Empowering farmers with intelligent tools, advanced insights, and 
            data-driven solutions to build a sustainable and successful future.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid md:grid-cols-2 gap-12">

          {/* Mission */}
          <div className="bg-green-50 p-8 rounded-2xl shadow hover:shadow-lg transition duration-300 border border-green-200">
            <div className="flex items-center gap-4 mb-5">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Mission Icon"
                className="w-16 drop-shadow-md animate-fadeIn"
              />
              <h3 className="text-3xl font-bold text-green-700">Our Mission</h3>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed">
              Our mission is to revolutionize agriculture by providing farmers with
              smart, AI-powered tools that simplify decision-making. We aim to increase
              crop yield, reduce losses, enhance soil health, and help farmers adopt
              sustainable practices through real-time data, accurate predictions,
              and intelligent insights.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-green-50 p-8 rounded-2xl shadow hover:shadow-lg transition duration-300 border border-green-200">
            <div className="flex items-center gap-4 mb-5">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png"
                alt="Vision Icon"
                className="w-16 drop-shadow-md animate-fadeIn"
              />
              <h3 className="text-3xl font-bold text-green-700">Our Vision</h3>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed">
              Our vision is to create a future where every farmer—regardless of 
              location, resources, or scale—can access modern agricultural intelligence. 
              We aim to build a globally trusted digital farming ecosystem that ensures 
              food security, improves farming efficiency, and promotes eco-friendly 
              and sustainable agriculture for generations to come.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
