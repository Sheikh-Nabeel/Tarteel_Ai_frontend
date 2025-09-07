import React, { useState } from "react";
import { Link } from "react-router-dom";
import NewPassword from './Images/newpassword.png'
const CreateNewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      alert("Please fill in both fields.");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // TODO: API call to update password
    console.log("New password set:", password);
    setSuccess(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4 py-6">
      <div className="w-full max-w-md  rounded-2xl shadow-xl p-8 relative">
        {/* Quran Website Branding */}
        <div className="text-center mb-6">
            <img src={NewPassword} alt="" className="w-24 mx-auto" />
          <p className="text-gray-600 mt-1">Create Your New Password</p>
        </div>

        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* New Password */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 rounded-lg text-white font-semibold bg-[#25D162] hover:bg-green-700 transition duration-200"
            >
              Save New Password
            </button>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-green-600 font-medium mb-4">
              ✅ Your password has been reset successfully!
            </p>
            <Link
              to="/login"
              className="text-[#25D162] font-semibold hover:underline"
            >
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateNewPassword;
