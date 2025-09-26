import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ResetPassword } from "../data/Api"; // <-- API for reset password

export default function ResetPasswordPage() {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as { email: string })?.email || "";

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await ResetPassword({ email, otp, newPassword });
      setMessage("Password reset successfully. Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError("Invalid OTP or something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Reset Password
        </h2>

        {message && (
          <div className="bg-green-100 text-green-700 px-4 py-2 mb-4 rounded">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleReset} className="space-y-6">
          {/* Email (disabled) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>

          {/* OTP */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              OTP
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter the OTP"
              required
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter new password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-200"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
