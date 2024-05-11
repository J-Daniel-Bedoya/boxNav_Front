import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const login = localStorage.getItem("login");
  if (login) {
    return <Outlet />;
  }
  return <Navigate to="/login" />;
};

export default ProtectedRoutes;
