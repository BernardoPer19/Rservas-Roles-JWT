import { useMutation } from "@tanstack/react-query";
import { LoginRequest, RegisterUserRequest } from "../api/AuthRequest";
import { LoginType, RegisterUserPublic, UserTypes } from "../types/AuthType";
import { useAuth } from "../context/AuthContext";

export const useAuthForm = () => {
  const { setUser } = useAuth();

  // useAuthForm.ts
  const {
    mutate: loginMutate,
    isPending: isLoginPending,
    isError: isLoginError,
    error: loginError,
    reset: resetLoginMutation,
  } = useMutation({
    mutationFn: (data: LoginType) => LoginRequest(data),
    onSuccess: (user: UserTypes) => {
      setUser(user); // esto debería guardar el usuario en AuthContext
    },
    onError: (error) => {
      console.error("Error al iniciar sesión", error);
      setTimeout(() => {
        resetLoginMutation();
      }, 3000);
    },
  });

  const {
    mutate: registerMutate,
    isPending: isRegisterPending,
    isError: isRegisterError,
    error: registerError,
    reset: resetRegisterMutation,
  } = useMutation({
    mutationFn: (data: RegisterUserPublic) => RegisterUserRequest(data),
    onSuccess: (user: UserTypes) => {
      console.log("Se registró correctamente");
      setUser(user);
    },
    onError: (error) => {
      console.error("Error al registrar", error);
      setTimeout(() => {
        resetRegisterMutation();
      }, 3000);
    },
  });

  return {
    login: {
      loginMutate,
      isLoginPending,
      isLoginError,
      loginError,
    },
    register: {
      registerMutate,
      isRegisterPending,
      isRegisterError,
      registerError,
    },
  };
};
