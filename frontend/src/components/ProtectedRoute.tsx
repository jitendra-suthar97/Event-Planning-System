import React from "react";
import { authStore } from "../stores/authStore";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { token } = authStore();
  const location = useLocation();

  if (!token) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }

  return <div>{children}</div>;
};

export default ProtectedRoute;
