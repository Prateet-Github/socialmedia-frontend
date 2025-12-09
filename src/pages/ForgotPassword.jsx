import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import Logo from "../components/Logo";

const isValidGmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
const API = `${import.meta.env.VITE_BACKEND_URL}/api/users`;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) return toast.error("Enter Gmail");
    if (!isValidGmail(email)) return toast.error("Only Gmail is allowed");

    try {
      setLoading(true);

      await axios.post(`${API}/reset-password-request`, { email });

      toast.success("OTP sent to Gmail");
      navigate("/reset-otp", { state: { email } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col min-h-screen w-full justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-sm border border-gray-300 dark:border-gray-700 rounded-2xl text-center p-6 gap-6"
      >
        <h2 className="text-2xl font-bold text-center">Reset Password</h2>

        <p className="text-sm font-semibold text-gray-400 dark:text-gray-500">
          <span>Enter your registered Gmail for a OTP.</span>
        </p>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Gmail"
          className="p-4 border border-gray-300 dark:border-gray-700 rounded outline-none focus:border-blue-500"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="border border-gray-300 dark:border-gray-700 p-3 rounded-2xl cursor-pointer bg-blue-500 hover:bg-blue-600 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {loading ? "Sending..." : "Send Reset OTP"}
        </button>

        <Link to="/" className="hover:underline text-sm">
          Back to Login
        </Link>
      </form>
    </main>
  );
};

export default ForgotPassword;
