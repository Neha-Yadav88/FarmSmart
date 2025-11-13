import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", email: "", password: "", phone: "", state: "", district: "",
    village: "", farmerType: "", farmArea: "", primaryCrop: "", soilType: "",
    preferredLanguage: ""
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiBase = import.meta.env.VITE_API_BASE || "";

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (file) fd.append("profileImage", file);

      const res = await fetch(`${apiBase}/api/auth/register`, {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      if (res.ok) {
        alert("Registered successfully! Please login.");
        navigate("/login");
      } else {
        alert(data.message || "Registration error");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen -mt-5 flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300 px-4">
      <div className="bg-white/80 backdrop-blur-lg mt-4 mb-6 shadow-md rounded-2xl p-8 w-full max-w-3xl border border-white/30">

        {/* HEADER */}
        <h2 className="text-3xl font-extrabold text-center text-green-700 mb-2">
          Create Your Farmer Account
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Register now to access your Smart Farming Dashboard
        </p>

        {/* FORM */}
        <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">

          {/* Name */}
          <div className="col-span-2">
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              required
              name="name"
              placeholder="Enter full name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-300 outline-none transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              required
              type="email"
              name="email"
              placeholder="Enter email address"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-300 outline-none transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              required
              type="password"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-300 outline-none transition"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-gray-700">Phone Number</label>
            <input
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-300 outline-none transition"
            />
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-medium text-gray-700">State</label>
            <input
              name="state"
              placeholder="State"
              value={form.state}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-300 outline-none transition"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">District</label>
            <input
              name="district"
              placeholder="District"
              value={form.district}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-300 outline-none transition"
            />
          </div>

          {/* Farmer Type + Farm Area */}
          <div>
            <label className="text-sm font-medium text-gray-700">Farmer Type</label>
            <select
              name="farmerType"
              value={form.farmerType}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-green-600 focus:ring-2 focus:ring-green-300 outline-none transition"
            >
              <option value="">Select</option>
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Farm Area (Acres)</label>
            <input
              name="farmArea"
              placeholder="e.g., 4 acres"
              value={form.farmArea}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-300 outline-none transition"
            />
          </div>

          {/* Crop + Soil */}
          <div>
            <label className="text-sm font-medium text-gray-700">Primary Crop</label>
            <input
              name="primaryCrop"
              placeholder="e.g., Wheat, Kinnow"
              value={form.primaryCrop}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-300 outline-none transition"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Soil Type</label>
            <select
              name="soilType"
              value={form.soilType}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-green-600 focus:ring-2 focus:ring-green-300 outline-none transition"
            >
              <option value="">Select Soil Type</option>
              <option>Sandy</option>
              <option>Loamy</option>
              <option>Clay</option>
              <option>Black</option>
            </select>
          </div>

          {/* Language */}
          <div className="col-span-2">
            <label className="text-sm font-medium text-gray-700">Preferred Language</label>
            <select
              name="preferredLanguage"
              value={form.preferredLanguage}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-green-600 focus:ring-2 focus:ring-green-300 outline-none transition"
            >
              <option value="">Select Language</option>
              <option>Hindi</option>
              <option>English</option>
              <option>Punjabi</option>
              <option>Tamil</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="col-span-2 mt-4">
            <button
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-3 rounded-lg transition active:scale-95"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>

        </form>

        {/* Login Redirect */}
        <p className="text-center mt-5 text-gray-700">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-700 font-semibold cursor-pointer hover:underline"
          >
            Login here
          </span>
        </p>

      </div>
    </div>
  );
}
