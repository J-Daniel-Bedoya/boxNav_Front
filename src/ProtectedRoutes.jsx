import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const login = localStorage.getItem("login");

  // console.log(login);

  if (login === "1234") {
    return <Outlet />;
  }
  return <Navigate to="/login" />;
};

export default ProtectedRoutes;
