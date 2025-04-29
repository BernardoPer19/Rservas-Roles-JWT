import { z } from "zod";

// Schema general
export const MixedUserSchema = z.object({
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
  rol: z.enum(["usuario", "empleado", "admin"]).optional(),
});


const LoginSchema = z.object({
  email: z.string().email("Email no válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type LoginType = z.infer<typeof LoginSchema>;

export const validateLogin = (input: unknown): LoginType => {
  return LoginSchema.parse(input);
};



export type MixedUserType = z.infer<typeof MixedUserSchema>;

export const validateRegister = (input: unknown): MixedUserType => {
  const vali = MixedUserSchema.safeParse(input);
  if (!vali.success) {
    const errorMessages = vali.error.errors.map((e) => e.message).join(", ");
    throw new Error(errorMessages);
  }
  return vali.data;
};
