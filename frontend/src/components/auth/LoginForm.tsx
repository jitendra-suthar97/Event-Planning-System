import { useState } from "react";
import { authStore } from "../../stores/authStore";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import type { ILogin } from "src/types/User";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  identifier: Yup.string().required("Username or email is required"),
  password: Yup.string().required("Password is required"),
});

const initialValues: ILogin = {
  identifier: "",
  password: "",
};

const LoginForm = () => {
  const [showpassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const { login } = authStore();

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values: ILogin, { setSubmitting, resetForm }) => {
          await login(values).then((res: any) => {
            const { success, message, accessToken, userId } = res;
            if (success) {
              localStorage.setItem("accessToken", accessToken);
              localStorage.setItem("userId", userId);
              setSubmitting(false);
              resetForm();
              toast.success(message);
              navigate("/");
            } else {
              toast.error(message);
              console.error(message);
            }
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6 w-full">
            <div className="flex flex-col w-full gap-1 space-y-2 text-left">
              <label
                htmlFor="identifier"
                className="text-sm font-medium text-gray-900"
              >
                Username or Email
              </label>
              <div className="relative">
                <span className="absolute left-2 top-2.5 text-gray-400">
                  <Mail className="size-4 text-blue-300" />
                </span>
                <Field
                  id="identifier"
                  name="identifier"
                  className="w-full h-9 pl-8 pr-2 rounded-md border border-gray-100 bg-gray-50 text-gray-900 focus:outline-none"
                  type="text"
                  placeholder="Enter Username or Email  "
                />
              </div>
              <ErrorMessage
                component={"span"}
                name="identifier"
                className="text-xs text-red-600"
              />
            </div>
            <div className=" flex flex-col w-full gap-1 space-y-2 text-left">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <div className="relative">
                <span className="absolute left-2 top-2.5 text-gray-400">
                  <LockKeyhole className="size-4 text-blue-300" />
                </span>
                <Field
                  id="password"
                  name="password"
                  className="w-full h-9 pl-8 pr-7 rounded-md border border-gray-100 bg-gray-50 text-gray-900 focus:outline-none"
                  type={showpassword ? "text" : "password"}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute right-2 top-2.5 text-gray-400 focus:outline-none cursor-pointer"
                  tabIndex={-1}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showpassword ? (
                    <EyeOff className="size-4 hover:text-blue-300" />
                  ) : (
                    <Eye className="size-4 hover:text-blue-300" />
                  )}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component={"span"}
                className="text-xs text-red-600"
              />
            </div>
            <button
              className="w-full h-10 bg-blue-500 rounded-lg text-white font-medium transition disabled:opacity-60 cursor-pointer"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in" : "Login"}
            </button>
          </Form>
        )}
      </Formik>
      <div className="text-center pt-4">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-400 hover:text-blue-500 underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
