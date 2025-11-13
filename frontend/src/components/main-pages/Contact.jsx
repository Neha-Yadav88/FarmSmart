import { useState } from "react";
import { HiPhone, HiMail, HiLocationMarker, HiClock } from "react-icons/hi";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null); // null | "error" | "success"

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setStatus(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic frontend validation
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      return;
    }
    // For now, just simulate success (hook to backend / email service later)
    setStatus("success");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-green-800">
            Contact Us
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Have a question or need help with Smart Farming Assistant? Drop a message or reach out using the details below — we’ll get back soon.
          </p>
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* CONTACT CARD */}
          <div className="space-y-6">
            {/* MAP (placeholder) */}
            <div className="rounded-lg overflow-hidden border">
              {/* Use a real map iframe or component later (GoogleMaps / Leaflet) */}
              <iframe
                title="office-location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=74.0%2C29.6%2C74.5%2C30.0&layer=mapnik"
                className="w-full h-96"
                loading="lazy"
              />
              <div className="p-3 bg-white text-sm text-gray-600">Map shows approximate location. Replace with your exact location or map service.</div>
            </div>
          </div>

          {/* CONTACT FORM */}
          <div>
            <div className="bg-white border rounded-lg shadow-md p-6">
              <h3 className="text-2xl font-bold text-green-700 mb-4">Send us a message</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-sm text-gray-600">Name*</span>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 p-3"
                      placeholder="Your name"
                      required
                      aria-required="true"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm text-gray-600">Email*</span>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 p-3"
                      placeholder="you@example.com"
                      required
                      aria-required="true"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-sm text-gray-600">Subject</span>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 p-3"
                    placeholder="Short subject"
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-gray-600">Message*</span>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="5"
                    className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 p-3"
                    placeholder="How can we help?"
                    required
                    aria-required="true"
                  />
                </label>

                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition font-medium"
                  >
                    Send Message
                  </button>

                  {status === "error" && (
                    <p className="text-sm text-red-600">Please fill required fields (Name, Email, Message).</p>
                  )}

                  {status === "success" && (
                    <p className="text-sm text-green-700">Thanks — your message has been sent (simulated).</p>
                  )}
                </div>
              </form>

              <p className="mt-4 text-sm text-gray-500">
                We respect your privacy. Your details will only be used to contact you regarding this enquiry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
