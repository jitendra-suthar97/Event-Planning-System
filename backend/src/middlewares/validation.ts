import j ,  {type ObjectSchema} from "joi";
import type { Request, Response, NextFunction } from "express";

export const validate = (schema :ObjectSchema) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = schema.validate(req.body);
  if (error) {
    const { details } = error;
    return res.status(400).json({ message: details[0].message });
  }

  next();
};

export const registrationSchema = j.object({
  userName: j
    .string()
    .required()
    .regex(/^[a-zA-Z0-9_]+$/)
    .trim()
    .messages({
      "string.empty": "Username is required",
      "string.pattern.base": "Username must not contain any special characters",
      "any.required": "Username is required",
    }),
  email: j
    .string()
    .required()
    .email()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .trim()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Invalid email address",
      "string.pattern.base": "Invalid email address",
      "any.required": "Email is required",
    }),
  password: j.string().required().min(6).trim().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be atleast 6 characters",
    "any.required": "Password is required",
  }),
});

export const loginSchema = j.object({
  identifier: j.string().required().trim().messages({
    "string.empty": "Username or Email is required",
    "any.required": "Username or Email is required",
  }),
  password: j.string().required().trim().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});

export const emailVerificationSchema = j.object({
  code: j.number().required().min(100000).max(999999).messages({
    "number.base": "Verification code must be a number",
    "number.empty": "Verification code is required",
    "any.required": "Verification code is required",
    "number.min": "Verification code must be exactly 6 digits",
    "number.max": "Verification code must be exactly 6 digits",
  }),
});
