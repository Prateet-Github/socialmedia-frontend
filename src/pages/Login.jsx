import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loginUser, clearError } from "../redux/authSlice";
import { toast } from "react-hot-toast";

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
      className="flex flex-col gap-4 min-h-screen w-full justify-center items-center"
    >
      <div className="flex flex-col w-full max-w-sm border rounded text-center p-6 gap-8">
        <h1 className="text-4xl">Social Media</h1>

        <div className="flex flex-col gap-4">
          <input
            name="email"
            type="text"
            placeholder="Username or Email"
            className="p-4 border rounded"
            value={form.email}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="p-4 border rounded"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Link to="/forgot-password" className="hover:underline text-sm">
          Forgot password?
        </Link>

        <button
          type="submit"
          disabled={loading}
          className="border p-4 rounded-2xl cursor-pointer disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>

      <div className="border rounded py-4 px-6 w-full max-w-sm text-center">
        <p>
          Don't have account?{" "}
          <Link to="/signup" className="hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
