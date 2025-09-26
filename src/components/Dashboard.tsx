import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get role from localStorage (set during login/registration)
    const storedRole = localStorage.getItem("role");
    if (!storedRole) {
      navigate("/login"); // redirect if no role found
    } else {
      setRole(storedRole);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8">
        {role === "ADMIN" ? (
          <h1 className="text-2xl font-bold text-green-600">
            Admin login successful ✅
          </h1>
        ) : role === "USER" ? (
          <h1 className="text-2xl font-bold text-blue-600">
            User login successful ✅
          </h1>
        ) : (
          <h1 className="text-2xl font-bold text-red-600">Unauthorized ❌</h1>
        )}

        <button
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
          className="mt-6 w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
