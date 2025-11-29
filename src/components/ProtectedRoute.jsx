import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    toast.error("You must be logged in to access this page");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
