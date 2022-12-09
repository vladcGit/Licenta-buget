import React from "react";
import { Navigate } from "react-router-dom";
import StickyLayout from "./StickyLayout";

export default function ProtectedRoute({ children }) {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" replace />;
  }

  return <StickyLayout>{children}</StickyLayout>;
}
