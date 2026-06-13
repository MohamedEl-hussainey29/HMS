/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

interface ProtectedRoutesProps {
  children: ReactNode;
  role?: "admin" | "user";
}

export default function ProtectedRoutes({ children, role }: ProtectedRoutesProps) {
  const { userData, loading }: any = useContext(AuthContext);
  const userRole = userData?.role;
  const token = localStorage.getItem("token");

  if (loading) return null;

  if (!token && !userData) {
    return <Navigate to={"/auth"} />;
  }

  if (role && userRole !== role) {
    return <Navigate to={userRole === "admin" ? "/dashboard" : "/"} />;
  }

  return children;
}
