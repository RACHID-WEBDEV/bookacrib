/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { Outlet, useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";

import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ allowedRole }) => {
  const location = useLocation();
  const { isAdminAuthenticated } = useSelector((state) => state.adminauth);
  const { isAuthenticated, switchToCompany, companyId } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  //   console.log("switchToCompany:::", switchToCompany);
  //   console.log("companyId:::", companyId);

  useEffect(() => {
    if (switchToCompany) {
      navigate("/crib-owner/dashboard");
    } else {
      navigate("/user/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserRole = () => {
    if (isAdminAuthenticated) return "admin";
    if (isAuthenticated && switchToCompany && companyId) return "crib";
    if (isAuthenticated && !switchToCompany && !companyId) return "user";
    return null;
  };

  const role = getUserRole();

  if (role === allowedRole) {
    return <Outlet />;
  }

  // Redirect based on actual role
  if (role === "admin")
    return (
      <Navigate to="/admin/dashboard" state={{ from: location }} replace />
    );
  if (role === "crib")
    return (
      <Navigate to="/crib-owner/dashboard" state={{ from: location }} replace />
    );
  if (role === "user")
    return <Navigate to="/user/dashboard" state={{ from: location }} replace />;

  // Not authenticated
  return (
    <Navigate
      to={allowedRole === "admin" ? "/admin/login" : "/login"}
      state={{ from: location }}
      replace
    />
  );
};

export default ProtectedRoute;
