export default function CTA() {
  return (
    <section
      id="cta"
      className="relative py-24 bg-[url('https://images.pexels.com/photos/1707820/pexels-photo-1707820.jpeg')] bg-cover bg-center bg-fixed"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-green-900 bg-opacity-70"></div>

      <div className="relative max-w-7xl mx-auto px-6 text-center text-white">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Empowering Farmers with Smart AI Solutions
        </h2>

        {/* Subtext */}
        <p className="mt-5 text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
          Monitor your crops, analyze soil, detect pests, and make intelligent farming decisions. 
          Experience the future of agriculture with real-time insights and AI-powered recommendations.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col md:flex-row justify-center gap-6">
          <a
            href="#tools"
            className="bg-green-500 px-8 py-3 text-lg rounded-lg font-semibold shadow-lg 
                       hover:bg-green-600 transition duration-300"
          >
            Explore Tools
          </a>

          <a
            href="#contact"
            className="bg-transparent border-2 border-white px-8 py-3 text-lg rounded-lg 
                       font-semibold hover:bg-white hover:text-green-700 transition duration-300"
          >
            Contact Us
          </a>
        </div>

        {/* Bottom Note */}
        <p className="mt-10 text-gray-300 text-sm">
          Trusted by farmers, powered by innovation, designed for smarter agriculture.
        </p>
      </div>
    </section>
  );
}
