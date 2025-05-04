// import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginForm from "../components/LoginForm";

function LoginPage() {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);

  // const navigate = useNavigate();



  return (
    <section>
      <LoginForm />
    </section>
  );
}

export default LoginPage;
