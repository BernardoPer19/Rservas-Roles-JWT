import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthForm } from "../hooks/useAuthForm";
import { toast, Toaster } from "sonner";
import { LoginType } from "../types/AuthType";
import { loginSchema } from "../schemas/AuthSchemas";

const LoginForm: React.FC = () => {
  const { loginMutate, isLoginPending, loginError } = useAuthForm().login;
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<LoginType> = (data) => {
    loginMutate(data, {
      onSuccess: () => {
        toast.success("Inicio de sesión exitoso");
      },
      onError: (error) => {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Error desconocido al iniciar sesión");
        }
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md mx-auto p-6 space-y-6 bg-white rounded-2xl shadow-lg"
    >
      <Toaster />
      <h2 className="text-2xl font-semibold text-center">Iniciar sesión</h2>

      {loginError instanceof Error && (
        <p className="text-center text-red-600 font-bold">
          {loginError.message}. Intenta nuevamente.
        </p>
      )}

      <div className="space-y-1">
        <input
          {...register("email")}
          placeholder="Correo electrónico"
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <input
          {...register("password")}
          type="password"
          placeholder="Contraseña"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoginPending}
        className="w-full py-2 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoginPending ? "Cargando..." : "Iniciar sesión"}
      </button>
    </form>
  );
};

export default LoginForm;
