import * as y from "yup";

export const signUpSchema = y.object({
  userName: y
    .string()
    .required("Username is required")
    .min(4, "UserName must be atleast 4 characters long"),
  email: y
    .string()
    .required("Email is required")
    .email("Please enter a valid email")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"),
  password: y
    .string()
    .required("Password is required")
    .min(6, "Password must be atleast 6 characters long"),
});

export const loginSchema = y.object({
  identifier: y.string().required("Username or email required"),
  password: y.string().required("Password is required"),
});
