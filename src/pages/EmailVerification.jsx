import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add logic to handle the verification code submission
    // For now, we'll just navigate to the home page
    navigate("/signup");
  }


  return (
    <form onSubmit={handleSubmit}>
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Email Verification
          </h2>
          <p className="mb-4 text-center">
            Please enter the verification code sent to your email.
          </p>
          <input
            type="text"
            placeholder="Verification Code"
            className="w-full p-4 border rounded mb-6"
          />
          <button type="submit" className="w-full bg-blue-600 text-white p-4 rounded hover:bg-blue-700 transition">
            Verify Email
          </button>
        </div>
      </div>
    </form>
  );
};

export default EmailVerification;
