import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import User from "../models/user.model.ts";

interface CustomJwtPayload extends JwtPayload {
  id: string;
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.headers.authorization;

    if (!accessToken) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized access" });
    }

    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET!
    ) as CustomJwtPayload;

    if (!decoded) {
      return res.status(403).json({
        success: false,
        authError: true,
        message: "Unauthorized access",
      });
    }
    const user = await User.findById(decoded.id).select(
      "-password -refreshToken -verifyCode -verifyCodeExpiry -isVerified"
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Error in auth middleware: ", error);

    if (
      error instanceof jwt.TokenExpiredError ||
      error instanceof jwt.JsonWebTokenError
    ) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
        authError: true,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const CheckRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.refreshToken;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No refresh token provided" });
    }

    const decoded: any = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET as string
    );

    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== token) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid refresh token" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in CheckRefreshToken middleware:", error);
    return res
      .status(403)
      .json({ success: false, message: "Invalid or expired refresh token" });
  }
};
