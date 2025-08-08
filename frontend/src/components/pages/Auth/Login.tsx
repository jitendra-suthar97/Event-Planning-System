import AuthLayout from "../../../components/layouts/AuthLayout";
import LoginForm from "../../../components/auth/LoginForm";

const Login = () => {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account to continue"
      illustration="/Computer login-rafiki.png"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
