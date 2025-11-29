import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { registerUser } from "../redux/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(form)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/home");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 min-h-screen w-full justify-center items-center"
    >
      <div className="flex flex-col w-full max-w-sm border rounded text-center p-6 gap-8">
        <h1 className="text-4xl">Welcome, to GeeksGram!</h1>

        <div className="flex flex-col gap-4">
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="p-4 border rounded"
          />
          <input
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            className="p-4 border rounded"
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-4 border rounded"
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="p-4 border rounded"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="border p-4 rounded-2xl cursor-pointer"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </div>

      <div className="border rounded py-4 px-6 w-full max-w-sm text-center">
        <p>
          Have an Account?{" "}
          <Link to="/" className="hover:underline">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Signup;
