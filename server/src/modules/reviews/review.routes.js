import { Router } from "express";
import Review from "./review.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { verifyJWT } from "../../middleware/auth.middleware.js";

const router = Router();

router.get(
  "/destination/:destinationId",
  asyncHandler(async (req, res) => {
    const reviews = await Review.find({ destination: req.params.destinationId })
      .populate("author", "name profileImage")
      .sort("-createdAt");
    
    const avg =
      reviews.length > 0
        ? reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length
        : 0;

    res.status(200).json({
      success: true,
      data: reviews,
      stats: { count: reviews.length, averageRating: Number(avg.toFixed(1)) },
    });
  })
);

router.post(
  "/destination/:destinationId",
  verifyJWT,
  asyncHandler(async (req, res) => {
    const existing = await Review.findOne({
      destination: req.params.destinationId,
      author: req.user._id,
    });

    if (existing) {
      existing.rating = req.body.rating;
      existing.comment = req.body.comment;
      await existing.save();
      const populated = await Review.findById(existing._id).populate("author", "name profileImage");
      return res.status(200).json({ success: true, message: "Review updated", data: populated });
    }

    const review = await Review.create({
      rating: req.body.rating,
      comment: req.body.comment,
      destination: req.params.destinationId,
      author: req.user._id,
    });

    const populated = await Review.findById(review._id).populate("author", "name profileImage");
    res.status(201).json({ success: true, message: "Review submitted", data: populated });
  })
);

export default router;
