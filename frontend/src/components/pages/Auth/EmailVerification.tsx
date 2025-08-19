import VerificationForm from "./EmailVerificationForm";
import AuthLayout from "../../layouts/AuthLayout";

const EmailVerification = () => {
  return (
    <div>
      <AuthLayout
        title="Email Verification"
        subtitle="Verify your email to continue"
        illustration="/Enter OTP-cuate.png"
      >
        <VerificationForm />
      </AuthLayout>
    </div>
  );
};

export default EmailVerification;
