import asyncHandler from "../../utils/asyncHandler.js";
import {
  getDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
} from "./destination.service.js";

export const getAllDestinations = asyncHandler(async (req, res) => {
  const result = await getDestinations(req.query);
  res.status(200).json({
    success: true,
    message: "Destinations retrieved successfully",
    data: result.destinations,
    pagination: result.pagination,
  });
});

export const getSingleDestination = asyncHandler(async (req, res) => {
  const destination = await getDestinationById(req.params.id);
  res.status(200).json({
    success: true,
    message: "Destination details retrieved",
    data: destination,
  });
});

export const createNewDestination = asyncHandler(async (req, res) => {
  const destination = await createDestination(
    req.body,
    req.user._id,
    req.user.role
  );
  res.status(201).json({
    success: true,
    message: "Destination created successfully",
    data: destination,
  });
});

export const updateExistingDestination = asyncHandler(async (req, res) => {
  const destination = await updateDestination(
    req.params.id,
    req.body,
    req.user
  );
  res.status(200).json({
    success: true,
    message: "Destination updated successfully",
    data: destination,
  });
});

export const removeDestination = asyncHandler(async (req, res) => {
  const result = await deleteDestination(req.params.id, req.user);
  res.status(200).json({
    success: true,
    message: result.message,
  });
});

