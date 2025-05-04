import { AxiosError } from "axios";
import {
  RegisterUserPublic,
  UserTypes,
  RegisterEmployeeAdmin,
  LoginType,
} from "../types/AuthType";
import axios from "./axios/axios";

export const RegisterUserRequest = async (
  data: RegisterUserPublic
): Promise<UserTypes> => {
  try {
    const response = await axios.post<UserTypes>("/register", data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const backendMessage =
        error.response.data?.message ||
        error.response.data?.errors ||
        error.message;
      throw new Error(backendMessage);
    }
    throw new Error("Error desconocido al registrar el usuario.");
  }
};

export const RegisterAdminRequest = async (
  data: RegisterEmployeeAdmin
): Promise<UserTypes> => {
  try {
    const response = await axios.post<UserTypes>("/registerAdmin", data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const backendMessage = error.response.data?.errors || error.message;
      throw new Error(backendMessage);
    }
    throw new Error("Error desconocido al registrar el usuario.");
  }
};

export const LoginRequest = async (data: LoginType): Promise<UserTypes> => {
  try {
    const response = await axios.post<UserTypes>("/login", data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const backendMessage =
        error.response.data?.message ||
        error.response.data?.errors ||
        error.message;
      throw new Error(backendMessage);
    }
    throw new Error("Error desconocido hacer login a el usuario.");
  }
};

export const logoutRequest = async () => {
  try {
    const response = await axios.post("/logout"); 
    return response.data;
  } catch (error) {
    console.log("Error en logout:", error);
  }
};

export const getCurrentUserRequest = async () => {
  try {
    const response = await axios.get("/me");

    return response.data;
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    throw error;
  }
};
