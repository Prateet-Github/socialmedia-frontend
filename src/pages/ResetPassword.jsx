import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const API = `${import.meta.env.VITE_BACKEND_URL}/api/users`;

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email missing");
      navigate("/forgot-password");
      return;
    }

    if (!password || !confirm) {
      toast.error("Fill all fields");
      return;
    }

    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await axios.post(`${API}/reset-password`, {
        email,
        newPassword: password,
      });

      toast.success("Password reset successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen flex justify-center items-center px-4"
    >
      <div className="p-6 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>

        <p className="text-center text-gray-500 mb-8">
          Please enter your new password
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
          className="w-full p-4 border border-gray-300 dark:border-gray-700  rounded mb-4 outline-none focus:border-blue-500"
        />

        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Confirm Password"
          className="w-full p-4 border border-gray-300 dark:border-gray-700  rounded mb-6 outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-3 rounded-2xl cursor-pointer hover:bg-blue-600 transition"
        >
          {loading ? "Updating..." : "Reset Password"}
        </button>
      </div>
    </form>
  );
};

export default ResetPassword;
