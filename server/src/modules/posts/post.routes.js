import { Router } from "express";
import Post from "./post.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { verifyJWT } from "../../middleware/auth.middleware.js";

const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const posts = await Post.find()
      .populate("author", "name profileImage role")
      .populate("destination", "name city country")
      .sort("-createdAt")
      .limit(30);
    res.status(200).json({ success: true, data: posts });
  })
);

router.post(
  "/",
  verifyJWT,
  asyncHandler(async (req, res) => {
    const post = await Post.create({
      ...req.body,
      author: req.user._id,
    });
    const populated = await Post.findById(post._id)
      .populate("author", "name profileImage role")
      .populate("destination", "name city country");
    res.status(201).json({ success: true, message: "Post shared successfully", data: populated });
  })
);

router.post(
  "/:id/like",
  verifyJWT,
  asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    const index = post.likes.indexOf(req.user._id);
    if (index === -1) {
      post.likes.push(req.user._id);
    } else {
      post.likes.splice(index, 1);
    }
    await post.save();
    res.status(200).json({ success: true, likesCount: post.likes.length, isLiked: index === -1 });
  })
);

export default router;
