import { useState } from "react";
import { authStore } from "../../stores/authStore";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import type { ISignup } from "../../types/User";
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";

const validationSchema = Yup.object({
  userName: Yup.string()
    .required("Username is required")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username must contain only letters, numbers, or _"
    )
    .test(
      "no-numbers-first-in-username",
      "Username can't start with numbers",
      (value) => (value ? !/^[0-9]/.test(value) : true)
    )
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot exceed 20 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email"
    ),
  password: Yup.string().required("Password is required"),
});

const initialValues: ISignup = {
  userName: "",
  email: "",
  password: "",
};

const RegisterForm = () => {
  const [showpassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const { signup } = authStore();

  const handleSubmit = async (values: ISignup) => {
    await signup(values).then((res: any) => {
      const { success, userId } = res;
      if (success) {
        localStorage.setItem("userId", userId);
        navigate(`/verifyEmail?user=${userId}`);
      }
    });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6 w-full">
            <div className="flex flex-col w-full gap-1 space-y-2 text-left">
              <label
                htmlFor="userName"
                className="text-sm font-medium text-gray-900"
              >
                Username
              </label>
              <div className="relative">
                <span className="absolute left-2 top-2.5 text-gray-400">
                  <UserRound className="size-4 text-blue-300" />
                </span>
                <Field
                  id="userName"
                  name="userName"
                  className="w-full h-9 pl-8 pr-2 rounded-md border border-gray-100 bg-gray-50 text-gray-900 focus:outline-none"
                  type="text"
                  placeholder="Enter your username"
                />
              </div>
              <ErrorMessage
                component={"span"}
                name="userName"
                className="text-xs text-red-600"
              />
            </div>
            <div className="flex flex-col w-full gap-1 space-y-2 text-left">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <div className="relative">
                <span className="absolute left-2 top-2.5 text-gray-400">
                  <Mail className="size-4 text-blue-300" />
                </span>
                <Field
                  id="email"
                  name="email"
                  className="w-full h-9 pl-8 pr-2 rounded-md border border-gray-100 bg-gray-50 text-gray-900 focus:outline-none"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>
              <ErrorMessage
                component={"span"}
                name="email"
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
              {isSubmitting ? "Signing Up" : "Signup"}
            </button>
          </Form>
        )}
      </Formik>
      <div className="text-center pt-4">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-400 hover:text-blue-500 underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
