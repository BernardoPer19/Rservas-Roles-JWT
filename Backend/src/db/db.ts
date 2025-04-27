import pg from "pg";
import { DB_HOST, DB_USER, DB_DATABASE, DB_PASSWORD, DB_PORT } from "../config";

export const pool = new pg.Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT,
});

export const connectDB = async () => {
  try {
    await pool.connect();
    console.log("Connected to the database successfully!");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to connect to the database:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
  }
};

export default pool;
