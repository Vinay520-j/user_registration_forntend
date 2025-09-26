import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SendOtp } from "../data/Api"; // <-- your API for sending OTP

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await SendOtp({ email }); // API to send OTP
      setMessage("OTP sent to your email. Please check your inbox.");
      // redirect to reset page after a delay
      setTimeout(() => navigate("/reset-password", { state: { email } }), 1500);
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Forgot Password
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

        <form onSubmit={handleSendOtp} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter your Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your registered email"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition duration-200"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
}
