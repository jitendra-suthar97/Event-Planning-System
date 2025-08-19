import { ErrorMessage, Field, Form, Formik } from "formik";
import { Hash } from "lucide-react";
import { authStore } from "../../../stores/authStore";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  code: Yup.string()
    .matches(/^\d{6}$/, "Enter a valid 6-digit code")
    .required("Verification code is required"),
});

const VerificationForm = () => {
  const { verifyEmail, resendCode } = authStore();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const userId = params.get("user");
  const navigate = useNavigate();

  const handleSubmit = async (values: { code: string }) => {
    const numericCode = Number(values.code);
    await verifyEmail(numericCode, userId!).then((res: any) => {
      const { success, message } = res;
      if (success) {
        toast.success(message);
        navigate("/login");
      }
    });
  };

  const handleResend = async () => {
    await resendCode(userId!);
  };
  return (
    <div>
      <Formik
        initialValues={{ code: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6 w-full">
            <div className="flex flex-col w-full gap-1 space-y-2 text-left">
              <label
                htmlFor="code"
                className="text-sm font-medium text-gray-900"
              >
                Verification Code
              </label>
              <div className="relative">
                <span className="absolute left-2 top-2.5 text-gray-400">
                  <Hash className="size-4 text-blue-300" />
                </span>
                <Field
                  id="code"
                  name="code"
                  className="w-full h-9 pl-8 pr-2 rounded-md border border-gray-100 bg-gray-50 text-gray-900 focus:outline-none"
                  type="number"
                  min={0}
                  maxLength={6}
                  placeholder="Enter verification code"
                />
              </div>
              <ErrorMessage
                component={"span"}
                name="code"
                className="text-xs text-red-600"
              />
            </div>
            <button
              className="w-full h-10 bg-blue-500 rounded-lg text-white font-medium transition disabled:opacity-60 cursor-pointer"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Verifying" : "Verify"}
            </button>
          </Form>
        )}
      </Formik>
      <div className="text-center pt-4">
        <p className="text-sm text-gray-600">
          Didn't recieve code ?{" "}
          <span
            className="font-medium text-blue-400 hover:text-blue-500 cursor-pointer underline"
            onClick={handleResend}
          >
            Resend Code
          </span>
        </p>
      </div>
    </div>
  );
};

export default VerificationForm;
