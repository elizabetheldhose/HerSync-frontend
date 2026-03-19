import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// ✅ FIX: Uses AuthContext instead of reading localStorage directly.
// This properly integrates with the RBAC role system.
export default function ProtectedRoute({ children, requiredRole }) {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // RBAC: if a specific role is required, check it
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
