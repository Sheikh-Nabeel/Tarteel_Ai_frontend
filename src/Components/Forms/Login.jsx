import React, { useState } from "react";
import { Link } from "react-router-dom";
import login from './Images/login.png'
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add login API logic
    console.log("Login submitted:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4 py-8">
      <div className="w-full max-w-md  rounded-2xl shadow-xl p-8 relative">
        {/* Top Islamic Pattern / Logo */}
        <div className="text-center mb-6">
          <img src={login} alt="" className="w-20 mx-auto" />
          <p className="text-gray-600 mt-1">Login to your account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg text-white font-semibold bg-[#25D162] hover:bg-green-700 transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Links */}
        <div className="mt-4 text-center text-sm">
          <Link to="/forgot-password" className="text-[#25D162] hover:underline">
            Forgot your password?
          </Link>
        </div>
        <div className="mt-2 text-center text-sm">
          <span className="text-gray-600">Don’t have an account?</span>{" "}
          <Link to="/signup" className="text-green-600 hover:underline font-medium">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
