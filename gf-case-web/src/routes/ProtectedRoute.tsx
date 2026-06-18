import { Navigate } from "react-router-dom";
import { authStore } from "../store/auth.store";



export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = authStore.getState().token;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}