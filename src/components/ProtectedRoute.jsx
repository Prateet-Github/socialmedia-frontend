import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("You must be logged in to access this page");
      setShouldRedirect(true);
    }
  }, [isAuthenticated]);

  if (shouldRedirect) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;