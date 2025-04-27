import { z } from "zod";
import { RegisterEmployeeAdmin, RegisterUserPublic } from "../types/AuthTypes";

const EmployeeAdmin = z.object({
  nombre: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  email: z
    .string()
    .min(1, { message: "El campo email es obligatorio" })
    .email({ message: "Revisa el formato del email" }),
  password: z
    .string()
    .min(4, { message: "La contraseña debe tener entre 4 y 12 caracteres" })
    .max(12, { message: "La contraseña debe tener entre 4 y 12 caracteres" }),
  rol: z.enum(["Usuario", "Empleado", "Admin"]),
});

const UserPublicSchema = z.object({
  nombre: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(4).max(12),
});

export const validateRegisterEmployees = (input: RegisterEmployeeAdmin) => {
  const vali = EmployeeAdmin.safeParse(input);
  if (!vali.success) {
    const errorMessages = vali.error.errors.map((e) => e.message).join(", ");
    throw new Error(errorMessages);
  }
};

export const validateRegisterUsers = (input: RegisterUserPublic) => {
  const vali = UserPublicSchema.safeParse(input);
  if (!vali.success) {
    const errorMessages = vali.error.errors.map((e) => e.message).join(", ");
    throw new Error(errorMessages);
  }
};
