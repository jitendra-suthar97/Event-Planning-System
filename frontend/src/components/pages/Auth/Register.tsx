import AuthLayout from "../../layouts/AuthLayout";
import RegisterForm from "./RegisterForm";

const SignUp = () => {
  return (
    <AuthLayout
      title="Let’s Get Started!"
      subtitle="Sign up to create, manage, and track your events — all in one place."
      illustration="/Mobile login-pana.png"
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default SignUp;
