export type rolesType = "usuario" | "empleado" | "admin";

export interface UserTypes {
  Usuario_id: number;
  nombre: string;
  email: string;
  password: string;
  rol: rolesType;
}

export type RegisterUserPublic = Omit<UserTypes, "Usuario_id" | "rol">;

export type RegisterEmployeeAdmin = Omit<UserTypes, "Usuario_id">;

export type LoginType = Omit<UserTypes, "rol" | "Usuario_id", "nombre">;
