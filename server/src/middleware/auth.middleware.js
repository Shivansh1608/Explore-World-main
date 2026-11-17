import jwt from "jsonwebtoken";
import User from "../modules/users/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized request: No token provided");
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET || "super_secret_jwt_key_for_explore_world_phase1_2026"
    );

    const user = await User.findById(decodedToken.id).select("-password");
    if (!user) {
      throw new ApiError(401, "Invalid Access Token: User not found");
    }

    if (!user.isActive) {
      throw new ApiError(403, "Your account has been deactivated");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid or expired access token");
  }
});

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new ApiError(
        403,
        `Role (${req.user?.role || "guest"}) is not allowed to access this resource`
      );
    }
    next();
  };
};

export const optionalAuth = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (token) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "super_secret_jwt_key_for_explore_world_phase1_2026"
      );
      req.user = await User.findById(decoded.id).select("-password");
    } catch {
      // Ignore token failure for optional endpoints
    }
  }
  next();
});
