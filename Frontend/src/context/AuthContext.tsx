import { createContext, useContext, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UserTypes } from "../types/AuthType";
import { getCurrentUserRequest } from "../api/AuthRequest";

type AuthContextType = {
  user: UserTypes | undefined;
  isAuthLoading: boolean;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    data: user,
    isLoading: isAuthLoading,
    error,
  } = useQuery<UserTypes, AxiosError>({
    queryKey: ["currentUser"],
    queryFn: getCurrentUserRequest,
    retry: false,
  });

  const isAuthenticated = useMemo(
    () => !isAuthLoading && !!user,
    [isAuthLoading, user]
  );

  if (error) {
    console.error("Error al obtener el usuario:", error.message);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthLoading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
};
