import { useEffect, useState } from "react";
import { HiUser, HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";
import { FaTractor, FaSeedling, FaGlobeAsia } from "react-icons/fa";

export default function Profile() {
  const [user, setUser] = useState(null);
  const apiBase = import.meta.env.VITE_API_BASE || "";

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${apiBase}/api/auth/user`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setUser(data.user));
  }, []);

  if (!user) return <div className="p-10 text-xl">Loading...</div>;

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-8 rounded-2xl shadow-md mb-8">
        <h1 className="text-4xl font-extrabold flex items-center gap-3">
          <HiUser className="text-5xl" /> Your Profile
        </h1>
        <p className="text-lg opacity-90 mt-2">
          View and manage your farming details.
        </p>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-white shadow-md rounded-2xl p-8 grid md:grid-cols-3 gap-10">

        {/* LEFT SIDE — PHOTO + BASIC INFO */}
        <div className="flex flex-col items-center text-center">
          <div className="w-32 h-32 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-6xl shadow-md">
            👨‍🌾
          </div>

          <h2 className="mt-4 text-2xl font-bold text-green-700">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">{user.phone}</p>

          {/* LOCATION */}
          <p className="mt-3 flex items-center gap-2 text-gray-700">
            <HiLocationMarker className="text-red-500" /> 
            {user.village}, {user.district}, {user.state}
          </p>
        </div>

        {/* MIDDLE — FARM INFORMATION */}
        <div>
          <h3 className="text-xl font-bold text-green-700 mb-4 border-b pb-2">
            🌾 Farm Details
          </h3>

          <div className="space-y-4 text-gray-700">
            <p className="flex items-center gap-3">
              <FaTractor className="text-green-700 text-xl" />
              <strong>Farmer Type:</strong> {user.farmerType}
            </p>

            <p className="flex items-center gap-3">
              <FaSeedling className="text-green-700 text-xl" />
              <strong>Primary Crop:</strong> {user.primaryCrop}
            </p>

            <p className="flex items-center gap-3">
              🌱 <strong>Soil Type:</strong> {user.soilType}
            </p>

            <p className="flex items-center gap-3">
              📏 <strong>Farm Area:</strong> {user.farmArea} acres
            </p>
          </div>
        </div>

        {/* RIGHT SIDE — SYSTEM PREFERENCES */}
        <div>
          <h3 className="text-xl font-bold text-green-700 mb-4 border-b pb-2">
            ⚙️ Preferences
          </h3>

          <div className="space-y-4 text-gray-700">

            <p className="flex items-center gap-3">
              <FaGlobeAsia className="text-blue-600 text-xl" />
              <strong>Preferred Language:</strong> {user.preferredLanguage}
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}
