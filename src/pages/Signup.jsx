import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <main className="flex bg-black text-white flex-col gap-4 min-h-screen w-full justify-center items-center">
      <div className="flex flex-col w-full max-w-sm border rounded text-center p-6 gap-8">
        <h1 className="text-4xl">Social Media</h1>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="p-4 border rounded"
          />
          <input
            type="text"
            placeholder="Email"
            className="p-4 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-4 border rounded"
          />
        </div>

        <p className="text-xs">
          By signing up, you agree to our Terms , Privacy Policy and Cookies
          Policy .
        </p>

        <button className=" border p-4 rounded-2xl cursor-pointer">
          Sign Up
        </button>
      </div>
      <div className="border rounded py-4 px-6 w-full max-w-sm text-center">
        <p>
          Have an Account?{" "}
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Signup;
