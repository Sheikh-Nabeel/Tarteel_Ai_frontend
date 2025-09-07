import React, { useState } from "react";
import { Link } from "react-router-dom";
import password from './Images/password.png'
const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address");
      return;
    }
    // TODO: API call to send reset link
    console.log("Password reset requested for:", email);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-md  rounded-2xl shadow-xl p-8 relative">
        {/* Quran Website Branding */}
        <div className="text-center mb-6">
            <img src={password} alt="" className="w-24 mx-auto" />
          <p className="text-gray-600 mt-1">Reset Your Password</p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Enter your registered email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 rounded-lg text-white font-semibold bg-[#25D162] hover:bg-green-700 transition duration-200"
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-[#25D162] font-medium mb-4">
              ✅ If this email is registered, a password reset link has been sent.
            </p>
          </div>
        )}

        {/* Links */}
        <div className="mt-4 text-center text-sm">
          <Link to="/login" className="text-[#25D162] hover:underline font-medium">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
