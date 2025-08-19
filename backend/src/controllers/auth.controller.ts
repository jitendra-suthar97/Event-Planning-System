import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.ts";
import { generateAccessAndRefreshToken } from "../utils/generateToken.ts";
import { sendVerificationCode } from "../utils/emailReminder/mail.ts";

export const Register = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;

    const existingUserWithUserName = await User.findOne({
      userName,
      isVerified: true,
    });

    if (existingUserWithUserName) {
      return res.status(409).json({
        success: false,
        message: "An account with these credentials already exists",
      });
    }

    let userId;
    const existingUserWithEmail = await User.findOne({
      email,
    });
    const verifyCode = Math.floor(100000 + Math.random() * 900000);

    if (existingUserWithEmail) {
      if (existingUserWithEmail.isVerified) {
        return res.status(409).json({
          success: false,
          message: "An account with these credentials already exists",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        existingUserWithEmail.password = hashPassword;
        existingUserWithEmail.verifyCode = verifyCode;
        existingUserWithEmail.verifyCodeExpiry = new Date(
          Date.now() + 2 * 60 * 1000
        );

        userId = existingUserWithEmail._id;
        await existingUserWithEmail.save();
      }
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        userName,
        email,
        password: hashPassword,
        verifyCode,
        isVerified: false,
        verifyCodeExpiry: new Date(Date.now() + 2 * 60 * 1000),
      });

      userId = newUser._id;
      await newUser.save();
    }

    const emailResponse = await sendVerificationCode(
      email,
      userName,
      verifyCode
    );

    if (!emailResponse.success) {
      return res
        .status(500)
        .json({ success: false, message: emailResponse.response });
    }

    res.status(201).json({
      success: true,
      message: "Signup successful. Please verify your email",
      userId,
    });
  } catch (error) {
    console.log("Error in register controller: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body;

    const user = await User.findOne({
      $or: [{ userName: identifier }, { email: identifier }],
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Your email is not verified",
      });
    }

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      return res
        .status(403)
        .json({ success: false, message: "Login failed. Wrong credentials" });
    }

    const { accessToken, refreshToken } = generateAccessAndRefreshToken(
      user._id as import("mongoose").Types.ObjectId,
      res
    );

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      userId: user._id,
    });
  } catch (error) {
    console.log("Error in login controller: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { code } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.isVerified) {
      return res
        .status(400)
        .json({ success: false, message: "Already verified" });
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry!) > new Date();

    if (isCodeNotExpired && isCodeValid) {
      user.isVerified = true;
      user.verifyCode = undefined;
      user.verifyCodeExpiry = undefined;

      await user.save();

      return res.status(200).json({
        success: true,
        message: "Account verified successfully",
      });
    } else if (!isCodeNotExpired) {
      return res.status(400).json({
        success: false,
        message: "Verification code expired, please request a new one",
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect verification code" });
    }
  } catch (error) {
    console.error("Error in verifyUser controller: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const Logout = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    await User.findByIdAndUpdate(
      refreshToken,
      {
        $set: {
          refreshToken: undefined,
        },
      },
      { new: true }
    );

    res
      .status(200)
      .clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .json({ success: true, message: "Logged out" });
  } catch (error) {
    console.error("Error in logout controller: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const RefreshAccessToken = (req: Request, res: Response) => {
  const accessToken = jwt.sign(
    { id: req.user?._id },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: "1h" }
  );

  res.status(200).json({ success: true, accessToken });
};

export const resendVerifyCode = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.isVerified) {
      return res
        .status(400)
        .json({ success: false, message: "Already verified" });
    }

    const verifyCode = Math.floor(100000 + Math.random() * 900000);

    user.verifyCode = verifyCode;
    user.verifyCodeExpiry = new Date(Date.now() + 2 * 60 * 1000);
    user.save({ validateBeforeSave: false });

    // const emailResponse = await sendMail(user.email, user.userName, verifyCode);

    // if (!emailResponse.success) {
    //   return res
    //     .status(500)
    //     .json({ success: false, message: emailResponse.response });
    // }

    const emailResponse = await sendVerificationCode(
      user.email,
      user.userName,
      verifyCode
    );

    if (!emailResponse.success) {
      return res
        .status(500)
        .json({ success: false, message: emailResponse.response });
    }

    res.status(200).json({
      success: true,
      message: "Verification code resent successfully",
    });
  } catch (error) {
    console.error("Error in resendVerifyCode controller: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getLoggedInUser = async (req: Request, res: Response) => {
  try {
    console.log("user: ", req.user);
    return res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.error("Error in getLoggedInUser controller: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
