import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  if (!token) {
    navigate("/login"); 
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;