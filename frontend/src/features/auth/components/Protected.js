import { useSelector } from "react-redux/es/hooks/useSelector";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser } from "../authSlice";

function Protected({ children }) {
  const user = useSelector((state) => state.customer.loggedInUser);
  if (!user) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  return children;
}

export default Protected;
