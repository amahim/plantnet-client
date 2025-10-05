import { Navigate } from "react-router-dom";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/Shared/loadingSpinner";

// eslint-disable-next-line react/prop-types
const CustomerRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (role === "customer") return children;

  return <Navigate to="/dashboard" replace="true" />;
};

export default CustomerRoute;
