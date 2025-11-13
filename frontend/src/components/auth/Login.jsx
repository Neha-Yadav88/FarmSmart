import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiBase = import.meta.env.VITE_API_BASE || "";

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        alert(data.message || "Login failed");
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
      
      {/* CARD */}
      <div className="bg-white/80 backdrop-blur-lg shadow-md rounded-2xl p-8 w-full max-w-md border border-white/30">

        {/* HEADING */}
        <h2 className="text-3xl font-extrabold text-center text-green-700 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Login to continue your Smart Farming Dashboard
        </p>

        {/* FORM */}
        <form onSubmit={submit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              required
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-300 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              required
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-300 outline-none transition"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-3 rounded-lg transition active:scale-95"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* REGISTER LINK */}
        <p className="text-center mt-4 text-gray-700">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-green-700 font-semibold cursor-pointer hover:underline"
          >
            Register now
          </span>
        </p>

      </div>
    </div>
  );
}
