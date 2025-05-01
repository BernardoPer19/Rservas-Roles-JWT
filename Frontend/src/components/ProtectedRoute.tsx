import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { JSX } from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRole: string;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, user, isAuthLoading } = useAuth();
  console.log({
    isAuthenticated: isAuthenticated,
    isAuthLoading: isAuthLoading,
    user: user,
  });

  if (isAuthLoading) {
    return <div>Loading...</div>; // O algo para indicar que está cargando
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // Redirigir al login si no está autenticado
  }

  if (user?.rol !== requiredRole) {
    return <Navigate to="/" />; // Redirigir si el rol no coincide
  }

  return children;
};

export default ProtectedRoute;
