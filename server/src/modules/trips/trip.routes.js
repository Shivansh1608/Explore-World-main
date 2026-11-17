import { Router } from "express";
import Trip from "./trip.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { verifyJWT } from "../../middleware/auth.middleware.js";
import ApiError from "../../utils/ApiError.js";

const router = Router();

router.get(
  "/",
  verifyJWT,
  asyncHandler(async (req, res) => {
    const trips = await Trip.find({ userId: req.user._id })
      .populate("destinations", "name city country images")
      .sort("-createdAt");
    res.status(200).json({ success: true, data: trips });
  })
);

router.post(
  "/",
  verifyJWT,
  asyncHandler(async (req, res) => {
    const trip = await Trip.create({
      ...req.body,
      userId: req.user._id,
    });
    res.status(201).json({ success: true, message: "Trip created", data: trip });
  })
);

router.get(
  "/:id",
  verifyJWT,
  asyncHandler(async (req, res) => {
    const trip = await Trip.findById(req.params.id).populate(
      "destinations",
      "name city country images"
    );
    if (!trip) throw new ApiError(404, "Trip not found");
    if (trip.userId.toString() !== req.user._id.toString() && trip.visibility !== "public") {
      throw new ApiError(403, "Not authorized to view this trip");
    }
    res.status(200).json({ success: true, data: trip });
  })
);

router.delete(
  "/:id",
  verifyJWT,
  asyncHandler(async (req, res) => {
    const trip = await Trip.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!trip) throw new ApiError(404, "Trip not found or unauthorized");
    res.status(200).json({ success: true, message: "Trip deleted" });
  })
);

export default router;

