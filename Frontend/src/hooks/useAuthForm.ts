import { useMutation } from "@tanstack/react-query";
import { LoginRequest, RegisterUserRequest } from "../api/AuthRequest";
import { LoginType, RegisterUserPublic } from "../types/AuthType";

export const useAuthForm = () => {
  const {
    isPending: isLoginPending,
    mutate: loginMutate,
    isError: isLoginError,
    error: loginError,
    reset: resetLoginMutation,
  } = useMutation({
    mutationFn: (data: LoginType) => LoginRequest(data),

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
