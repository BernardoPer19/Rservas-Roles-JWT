import { Router } from "express";
import { AuthController } from "../controller/AuthController";
import { permitRoles } from "../middlewares/permisionRolesMiddleware";
import { verify } from "../middlewares/verifyTokenMiddleware";

export const AuthRoutes = Router();

AuthRoutes.post("/register", AuthController.register);

AuthRoutes.post("/login", AuthController.login);

// AuthRoutes.get(
//   "/dashboard",
//   verify,
//   permitRoles("admin"),
//   DashboardController.adminOnly
// );
// AuthRoutes.get(
//   "/empleado",
//   verify,
//   permitRoles("empleado"),
//   EmpleadoController.onlyEmpleado
// );

// AuthRoutes.get("/empleados", verify, permitRoles("Admin"), getEmpleados);
// AuthRoutes.post("/empleados", verify, permitRoles("Admin"), createEmpleado);
// AuthRoutes.get("/reservas", verify, permitRoles("Admin", "Empleado"), getReservas);
// AuthRoutes.post("/reservas", verify, permitRoles("Empleado"), createReserva);
