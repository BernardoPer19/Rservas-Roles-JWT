import express from "express";
import { AuthRoutes } from "./routes/auth.routes";
import cookieParser from "cookie-parser";
import AdminRoute from "./routes/Admin.routes";
import userRoutes from "./routes/public.routes";
import cors from 'cors'
const app = express();
const PORT = 3000;

app.use(cors({
  credentials: true,
  origin: "http://localhost:5173"
}))
app.use(cookieParser());
app.use(express.json());
app.use("/", AuthRoutes);
app.use("/", AdminRoute);
app.use("/", userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
