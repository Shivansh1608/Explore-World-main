import asyncHandler from "../../utils/asyncHandler.js";
import {
  registerUser,
  loginUser,
  refreshAccessToken,
} from "./auth.service.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const register = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await registerUser(req.body);

  res
    .status(201)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .cookie("accessToken", accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 })
    .json({
      success: true,
      message: "User registered successfully",
      data: { user, accessToken, refreshToken },
    });
});

export const login = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await loginUser(req.body);

  res
    .status(200)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .cookie("accessToken", accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 })
    .json({
      success: true,
      message: "Login successful",
      data: { user, accessToken, refreshToken },
    });
});

export const logout = asyncHandler(async (req, res) => {
  res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

export const refresh = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body?.refreshToken;

  const { user, accessToken, refreshToken } =
    await refreshAccessToken(incomingRefreshToken);

  res
    .status(200)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .cookie("accessToken", accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 })
    .json({
      success: true,
      message: "Access token refreshed",
      data: { user, accessToken, refreshToken },
    });
});

export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Current authenticated profile",
    data: req.user,
  });
});
