import { Link } from "react-router-dom";

const ForgotPassword = () => {
  // JSX
  return (
    <main className="flex bg-black text-white flex-col min-h-screen w-full justify-center items-center">
      <div className="flex flex-col w-full max-w-sm border rounded text-center p-6 gap-6">
        <h1 className="text-4xl">Social Media</h1>
        <h1>Trouble logging in?</h1>
        <p>
          Enter your email, phone, or username and we'll send you a link to get
          back into your account.
        </p>
        <input
          type="text"
          placeholder="Username or Email"
          className="p-4 border rounded"
        />
        <button className="border p-4 rounded-2xl cursor-pointer">
          Send Reset Link
        </button>
        <Link to="/login" className="hover:underline">
          Back to Login
        </Link>
      </div>
    </main>
  );
};

export default ForgotPassword;
