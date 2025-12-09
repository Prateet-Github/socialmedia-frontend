import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

const API = `${import.meta.env.VITE_BACKEND_URL}/api/users`;

const EnterResetOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (!email) navigate("/forgot-password"); // redirect if direct access
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp.trim()) return toast.error("Please enter OTP");

    try {
      await axios.post(`${API}/verify-reset-otp`, { email, otp });
      toast.success("OTP verified");
      navigate("/reset-password", { state: { email } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <main className="flex min-h-screen w-full justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-sm border border-gray-300  dark:border-gray-700 rounded text-center p-6 gap-6"
      >
        <h1 className="text-2xl font-semibold">Enter Reset OTP</h1>

        <p className="text-gray-400 dark:text-gray-500 text-sm">
          We sent a code to <b>{email}</b>
        </p>

        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          type="text"
          placeholder="Enter OTP"
          className="p-4 border border-gray-300  dark:border-gray-700 rounded outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          className="border border-blue-500 p-3 rounded-2xl cursor-pointer bg-blue-600 hover:bg-blue-700 transition"
        >
          Continue
        </button>

        <button
          type="button"
          className="text-sm cursor-pointer text-blue-400 hover:underline"
        >
          Resend OTP
        </button>
      </form>
    </main>
  );
};

export default EnterResetOtp;
