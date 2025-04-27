export interface UserTypes {
  usuario_id?: string;
  nombre: string;
  email: string;
  password: string;
  rol: rolesType;
}

export type rolesType = "Usuario" | "Empleado" | "Admin";
