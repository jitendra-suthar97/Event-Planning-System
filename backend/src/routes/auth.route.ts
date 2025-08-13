import { Router } from "express";
import {
  emailVerificationSchema,
  loginSchema,
  registrationSchema,
  validate,
} from "../middlewares/validation.ts";
import {
  getLoggedInUser,
  Login,
  RefreshAccessToken,
  Register,
  resendVerifyCode,
  verifyEmail,
} from "../controllers/auth.controller.ts";
import { CheckRefreshToken, isAuthenticated } from "../middlewares/auth.ts";

const router = Router();

router.post("/register", validate(registrationSchema), Register);
router.post("/login", validate(loginSchema), Login);
router.post("/verifyEmail/:id", validate(emailVerificationSchema), verifyEmail);
router.post("/resendCode/:id", resendVerifyCode);
router.get("/getLoggedInUser", isAuthenticated, getLoggedInUser);
router.post("/refreshToken", CheckRefreshToken, RefreshAccessToken);

export default router;
