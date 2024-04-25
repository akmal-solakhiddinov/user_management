import React from "react";
import { useUserContext } from "./UserContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { state } = useUserContext();
  if (!state.isLoading) {
    return state.isLogin ? <>{children}</> : <Navigate to={"/login"} replace />;
  }
}

export default ProtectedRoute;
