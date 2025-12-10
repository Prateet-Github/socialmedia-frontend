import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loginUser, clearError } from "../redux/authSlice";
import { toast } from "react-hot-toast";
import Logo from "../components/Logo";

const Login = () => {
  // state variables
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // redux
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // effects
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  // handlers
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) dispatch(clearError());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.success(`Welcome back, ${res.payload.username}!`);
        navigate("/home");
      } else {
        toast.error("Invalid email or password");
      }
    });
  };

  // JSX
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 min-h-screen w-full justify-center items-center px-4"
    >
      <div className="flex flex-col w-full max-w-sm border  border-gray-300 dark:border-gray-700 rounded-2xl text-center p-6 gap-4">
        <div className="flex gap-4 justify-center items-center p-2 w-fit mx-auto">
          <Logo size={50}></Logo>
          <span className="font-bold text-4xl">GeeksGram</span>
        </div>

        <p className="text-sm font-semibold text-gray-400 dark:text-gray-500">
          Login with your Gmail to continue.
        </p>

        <div className="flex flex-col gap-4">
          <input
            name="email"
            type="text"
            placeholder="Gmail"
            className="p-4 border-gray-300 dark:border-gray-700 border rounded outline-none focus:border-blue-500"
            value={form.email}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="p-4 border border-gray-300 dark:border-gray-700 rounded outline-none focus:border-blue-500"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Link
          to="/forgot-password"
          className="hover:underline text-sm text-blue-500"
        >
          Forgot password?
        </Link>

        <button
          type="submit"
          disabled={loading}
          className="border  border-gray-300 dark:border-gray-700 bg-blue-500 hover:bg-blue-600 p-3 rounded-2xl cursor-pointer disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>

      <div className="border  border-gray-300 dark:border-gray-700 rounded-2xl py-4 px-6 w-full max-w-sm text-center">
        <p>
          Don't have account?{" "}
          <Link to="/signup" className="hover:underline text-blue-500">
            Sign Up
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
