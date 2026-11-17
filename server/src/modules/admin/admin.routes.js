import { Router } from "express";
import User from "../users/user.model.js";
import Destination from "../destinations/destination.model.js";
import Post from "../posts/post.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { verifyJWT, authorizeRoles } from "../../middleware/auth.middleware.js";

const router = Router();

router.use(verifyJWT, authorizeRoles("admin", "moderator"));

router.get(
  "/stats",
  asyncHandler(async (req, res) => {
    const [usersCount, destinationsCount, postsCount, pendingDestinations] =
      await Promise.all([
        User.countDocuments(),
        Destination.countDocuments(),
        Post.countDocuments(),
        Destination.countDocuments({ status: "pending" }),
      ]);

    res.status(200).json({
      success: true,
      data: {
        totalUsers: usersCount,
        totalDestinations: destinationsCount,
        totalPosts: postsCount,
        pendingDestinations,
      },
    });
  })
);

router.get(
  "/users",
  asyncHandler(async (req, res) => {
    const users = await User.find().select("-password").sort("-createdAt").limit(50);
    res.status(200).json({ success: true, data: users });
  })
);

router.patch(
  "/users/:id/role",
  asyncHandler(async (req, res) => {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("-password");
    res.status(200).json({ success: true, message: "User role updated", data: user });
  })
);

export default router;
