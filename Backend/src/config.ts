export const JWT_PASSWORD =
  process.env.JWT_PASSWORD || "myAPPPasswordInThisFile";

export const DB_USER = process.env.DB_USER || "postgress";
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_DATABASE = process.env.DB_DATABASE || "reserva_db";
export const DB_PASSWORD = process.env.DB_PASSWORD || "mysqlcasa";
export const DB_PORT = Number(process.env.DB_PORT) || 5432;
