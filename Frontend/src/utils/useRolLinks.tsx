import { Link } from "react-router-dom";
import { rolesType } from "../types/AuthType";

export const getRoleLinks = (role: rolesType, onLogout: () => void) => {
  switch (role) {
    case "admin":
      return (
        <>
          <Link
            to="/register-employee"
            className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 font-medium transition"
          >
            Registrar Empleado
          </Link>
          <Link
            to="/reservations"
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 font-medium transition"
          >
            Reservas
          </Link>
          <Link
            to="/users"
            className="px-4 py-2 rounded bg-yellow-600 hover:bg-yellow-700 font-medium transition"
          >
            Usuarios
          </Link>
          <button
            onClick={onLogout}
            className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 font-medium transition"
          >
            Cerrar sesión
          </button>
        </>
      );
    case "empleado":
      return (
        <>
          <Link
            to="/reservations"
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 font-medium transition"
          >
            Reservas
          </Link>
          <button
            onClick={onLogout}
            className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 font-medium transition"
          >
            Cerrar sesión
          </button>
        </>
      );
    case "usuario":
      return (
        <>
          <Link
            to="/reservations"
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 font-medium transition"
          >
            Reservas
          </Link>
          <button
            onClick={onLogout}
            className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 font-medium transition"
          >
            Cerrar sesión
          </button>
        </>
      );
    default:
      return null;
  }
};
