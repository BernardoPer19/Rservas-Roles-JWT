export type rolesType = "usuario" | "empleado" | "admin";

export interface UserTypes {
  Usuario_id: string;
  nombre: string;
  email: string;
  password: string;
  rol: rolesType; 
}

export type RegisterUserPublic = Omit<UserTypes, "usuario_id" | "rol">;

export type RegisterEmployeeAdmin = Omit<UserTypes, "usuario_id">;
