import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add logic to handle the signup submission
    // For now, we'll just navigate to a welcome page or home
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex bg-black text-white flex-col gap-4 min-h-screen w-full justify-center items-center"
    >
      <div className="flex flex-col w-full max-w-sm border rounded text-center p-6 gap-8">
        <h1 className="text-4xl">Enter your profile details</h1>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="p-4 border rounded"
          />
          <input
            type="text"
            placeholder="Full Name"
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

        <button
          type="submit"
          className=" border p-4 rounded-2xl cursor-pointer"
        >
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
    </form>
  );
};

export default Signup;
