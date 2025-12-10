import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { verifyEmail } from "../redux/authSlice";
import api from "../utils/api";

const API = `${import.meta.env.VITE_BACKEND_URL}/api/users`;

const EmailVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // redirect if no email present
  useEffect(() => {
    if (!email) navigate("/");
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      toast.error("Enter OTP");
      return;
    }

    try {
      setLoading(true);

      // instead of axios → use Redux
      const res = await dispatch(verifyEmail({ email, otp }));

      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Email verified!");
        navigate("/home"); // logged in automatically
      } else {
        toast.error(res.payload || "Invalid OTP");
      }
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      await api.post(`/users/resend-otp`, { email });
      toast.success("OTP sent again!");
    } catch (err) {
      if (err.response?.status === 429) {
        toast.error("Please wait before requesting another OTP!");
      } else {
        toast.error("Unable to resend OTP");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="min-h-screen w-full flex items-center justify-center px-4">
        <div className="p-8 rounded shadow-md w-full max-w-sm border border-gray-300 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Gmail Verification
          </h2>
          <p className="mb-4 text-center">
            A verification code has been sent to <b>{email}</b>
          </p>

          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            type="text"
            placeholder="Verification Code"
            className="w-full p-4 border border-gray-300 dark:border-gray-700  rounded mb-6"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition disabled:bg-blue-400"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify Gmail"}
          </button>

          <button
            type="button"
            onClick={resendOtp}
            className="mt-4 w-full text-sm text-blue-600 hover:underline"
          >
            Resend OTP
          </button>
        </div>
      </div>
    </form>
  );
};

export default EmailVerification;
