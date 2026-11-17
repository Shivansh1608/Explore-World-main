import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../users/user.model.js";
import ApiError from "../../utils/ApiError.js";

export const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    process.env.JWT_SECRET || "super_secret_jwt_key_for_explore_world_phase1_2026",
    { expiresIn: process.env.JWT_EXPIRES_IN || "15m" }
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET || "super_secret_refresh_token_key_explore_world_phase1_2026",
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d" }
  );

  return { accessToken, refreshToken };
};

export const registerUser = async ({ name, email, password, bio, role }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    bio: bio || "",
    role: role || "user",
    profileImage: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
  });

  const createdUser = await User.findById(user._id).select("-password");
  const tokens = generateTokens(createdUser);

  return { user: createdUser, ...tokens };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  if (!user.isActive) {
    throw new ApiError(403, "Account is disabled. Please contact support.");
  }

  const userWithoutPassword = await User.findById(user._id).select("-password");
  const tokens = generateTokens(userWithoutPassword);

  return { user: userWithoutPassword, ...tokens };
};

export const refreshAccessToken = async (incomingRefreshToken) => {
  if (!incomingRefreshToken) {
    throw new ApiError(401, "Refresh token required");
  }

  try {
    const decoded = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET || "super_secret_refresh_token_key_explore_world_phase1_2026"
    );

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    const { accessToken, refreshToken } = generateTokens(user);
    return { user, accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(401, "Expired or invalid refresh token");
  }
};
