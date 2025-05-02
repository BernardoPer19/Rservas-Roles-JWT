import { useForm, SubmitHandler } from "react-hook-form";
import { UserTypes } from "../types/AuthType";
import { useAuthForm } from "../hooks/useAuthForm";
import { toast, Toaster } from "sonner";

const RegisterForm: React.FC = () => {
  const { registerMutate, isRegisterPending, isRegisterError, registerError } =
    useAuthForm().register;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserTypes>();

  const onSubmit: SubmitHandler<UserTypes> = (data) => {
    registerMutate(data, {
      onSuccess: () => {
        toast.success("Usuario registrado exitosamente");
        reset();
      },
      onError: (error) => {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Ocurrió un error al registrar");
        }
      },
    });
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Toaster />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Register
        </h2>

        {isRegisterError && registerError instanceof Error && (
          <p className="text-red-500 text-sm text-center mb-4">
            {registerError.message}
          </p>
        )}

        {/* Name Field */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            aria-describedby="name-error"
            {...register("nombre", { required: "Name is required" })}
            className={`mt-1 block w-full px-4 py-2 border ${
              errors.nombre ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.nombre && (
            <p id="name-error" className="text-red-500 text-sm mt-1">
              {errors.nombre.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            aria-describedby="email-error"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            className={`mt-1 block w-full px-4 py-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.email && (
            <p id="email-error" className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            aria-describedby="password-error"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            className={`mt-1 block w-full px-4 py-2 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.password && (
            <p id="password-error" className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isRegisterPending}
          className={`w-full py-2 px-4 rounded-md text-white ${
            isRegisterPending
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isRegisterPending ? "Registrando..." : "Registrarse"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
