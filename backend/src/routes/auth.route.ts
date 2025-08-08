import { Router } from "express";
import {
  emailVerificationSchema,
  loginSchema,
  registrationSchema,
  validate,
} from "../middlewares/validation.ts";
import {
  Login,
  Register,
  resendVerifyCode,
  verifyEmail,
} from "../controllers/auth.controller.ts";

const router = Router();

router.post("/register", validate(registrationSchema), Register);
router.post("/login", validate(loginSchema), Login);
router.post("/verifyEmail/:id", validate(emailVerificationSchema), verifyEmail);
router.post("/resendCode/:id", resendVerifyCode);

export default router;
