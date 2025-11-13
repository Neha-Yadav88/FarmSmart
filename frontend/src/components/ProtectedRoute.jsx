import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setOk(false);
      setLoading(false);
      return;
    }
    // verify by calling backend
    fetch(`${import.meta.env.VITE_API_BASE || ""}/api/auth/user`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data?.user) {
          setOk(true);
        } else {
          setOk(false);
        }
      })
      .catch(() => setOk(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Checking authentication...</div>;
  if (!ok) return <Navigate to="/login" replace />;

  return children;
}
