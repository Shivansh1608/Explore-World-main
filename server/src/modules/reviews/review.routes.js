import { Router } from "express";
import mongoose from "mongoose";
import Review from "./review.model.js";
import Destination from "../destinations/destination.model.js";
import User from "../users/user.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { verifyJWT } from "../../middleware/auth.middleware.js";

const router = Router();

router.get(
  "/destination/:destinationId",
  asyncHandler(async (req, res) => {
    let destId = req.params.destinationId;
    if (!mongoose.Types.ObjectId.isValid(destId)) {
      const cleanSlug = destId.replace(/-/g, " ").trim();
      const d = await Destination.findOne({ name: { $regex: cleanSlug, $options: "i" } });
      destId = d ? d._id : null;
    }

    if (!destId) {
      return res.status(200).json({
        success: true,
        data: [],
        stats: { count: 0, averageRating: 0 },
      });
    }

    const reviews = await Review.find({ destination: destId })
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
    let destId = req.params.destinationId;
    if (!mongoose.Types.ObjectId.isValid(destId)) {
      const cleanSlug = destId.replace(/-/g, " ").trim();
      const d = await Destination.findOne({ name: { $regex: cleanSlug, $options: "i" } });
      if (!d) {
        return res.status(404).json({ success: false, message: "Destination not found" });
      }
      destId = d._id;
    }

    const existing = await Review.findOne({
      destination: destId,
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
      destination: destId,
      author: req.user._id,
    });

    const populated = await Review.findById(review._id).populate("author", "name profileImage");
    res.status(201).json({ success: true, message: "Review submitted", data: populated });
  })
);

export default router;

