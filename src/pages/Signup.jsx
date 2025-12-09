import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { registerUser } from "../redux/authSlice";
import { toast } from "react-hot-toast";
import Logo from "../components/Logo";

const isValidGmail = (email) => {
  const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  return gmailPattern.test(email);
};

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const { loading, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, username, email, password } = form;

    // Basic validations
    if (!name || !username || !email.trim() || !password) {
      toast.error("Please fill all fields");
      return;
    }

    // Gmail-only validation
    if (!isValidGmail(email)) {
      toast.error("Please use a valid Gmail address");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await dispatch(registerUser(form));

      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Account created! Check your Gmail for the OTP.");
        // Navigate to OTP / email verification page
        navigate("/email-verification", { state: { email } });
      } else {
        toast.error(res.payload || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 min-h-screen w-full justify-center items-center px-4"
    >
      <div className="flex flex-col w-full max-w-sm border border-gray-300 dark:border-gray-700 rounded-2xl text-center p-6 gap-4">
        <div className="flex gap-4 justify-center items-center p-2 w-fit mx-auto">
          <Logo size={50}></Logo>
          <span className="font-bold text-4xl">GeeksGram</span>
        </div>
        <p className="text-sm font-semibold text-gray-400 dark:text-gray-500">
          Sign up with your Gmail to get started.
        </p>

        <div className="flex flex-col gap-4">
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="p-3 border  border-gray-300 dark:border-gray-700 rounded outline-none focus:border-blue-500"
          />
          <input
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            className="p-3 border border-gray-300 dark:border-gray-700 rounded outline-none focus:border-blue-500"
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Gmail"
            className="p-3 border  border-gray-300 dark:border-gray-700 rounded outline-none focus:border-blue-500"
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="p-3 border  border-gray-300 dark:border-gray-700 rounded outline-none focus:border-blue-500"
          />
        </div>

        {/* Backend error (e.g., username already exists) */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="border  border-gray-300  dark:border-gray-700 p-3 rounded-2xl mt-1 cursor-pointer bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed transition"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </div>

      <div className="border border-gray-300 dark:border-gray-700 rounded-2xl py-4 px-6 w-full max-w-sm text-center">
        <p>
          Already have an account?{" "}
          <Link to="/" className="hover:underline text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Signup;
