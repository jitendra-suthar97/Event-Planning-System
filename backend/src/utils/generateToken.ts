import type { Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const generateAccessAndRefreshToken = (
  id: Types.ObjectId,
  res: Response
) => {
  const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "2h",
  });

  const refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "2d",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 2 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
    secure: true,
    path: "/",
  });

  return { accessToken, refreshToken };
};
