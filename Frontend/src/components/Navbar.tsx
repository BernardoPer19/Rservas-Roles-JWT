import { useAuth } from "../context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { logoutRequest } from "../api/AuthRequest";
import { Link } from "react-router-dom";
import { getRoleLinks } from "../utils/useRolLinks";

function NavBar() {
  const { user, isAuthenticated, setIsAuthenticated } = useAuth(); // Accedemos al user y setter
  const navigate = useNavigate();
  const queryClient = useQueryClient();


  const handleLogout = async () => {
    try {
      await logoutRequest();
      Cookies.remove("access_token");
      queryClient.setQueryData(["currentUser"], null);
      setIsAuthenticated(false);
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Llamamos a getRoleLinks pasándole el rol del usuario y la función de logout
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <div className="text-xl font-bold">🌟 My Goals App</div>

      <div className="space-x-4">
        {isAuthenticated && user ? (
          getRoleLinks(user.rol, handleLogout)
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 font-medium transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 font-medium transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
