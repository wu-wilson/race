import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { ReactNode, useEffect } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const user = UserAuth();

  // If the user is not authenticted, redirect to login
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (!user.emailVerified) {
      navigate("/verify");
    }
  }, [user]);

  return <>{children}</>;
};

export default ProtectedRoute;
