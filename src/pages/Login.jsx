import { Link } from "react-router-dom";

const Login = () => {
  return (
    <main className="flex bg-black text-white flex-col gap-4 min-h-screen w-full justify-center items-center">
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
        <button className=" border p-4 rounded-2xl cursor-pointer">
          Login
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
    </main>
  );
};

export default Login;
