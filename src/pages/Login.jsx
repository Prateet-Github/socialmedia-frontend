import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    navigate("/home");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 min-h-screen w-full justify-center items-center"
    >
      <div className="flex flex-col w-full max-w-sm border rounded text-center p-6 gap-8">
        <h1 className="text-4xl">Social Media</h1>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username or Email"
            className="p-4 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-4 border rounded"
          />
        </div>
        <Link to="/forgot-password" className="hover:underline">
          Forgot password?
        </Link>
        <button
          type="submit"
          className=" border p-4 rounded-2xl cursor-pointer"
        >
          Login
        </button>
      </div>
      <div className="border rounded py-4 px-6 w-full max-w-sm text-center">
        <p>
          Don't have account?{" "}
          <Link to="/enter-email" className="hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
