import { useNavigate } from "react-router-dom";

const EnterEmail = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add logic to handle the email submission
    // For now, we'll just navigate to a confirmation page
    navigate("/email-verification");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Enter Your Email
          </h2>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-4 border rounded mb-6"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-4 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default EnterEmail;
