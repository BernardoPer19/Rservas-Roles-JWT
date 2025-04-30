import express from "express";
import { AuthRoutes } from "./routes/AuthRouter";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;

app.use(cookieParser())
app.use(express.json());
app.use("/", AuthRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
