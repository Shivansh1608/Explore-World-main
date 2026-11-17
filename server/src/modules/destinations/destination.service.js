import Destination from "./destination.model.js";
import ApiError from "../../utils/ApiError.js";

export const getDestinations = async (query = {}) => {
  const {
    search,
    category,
    country,
    minBudget,
    maxBudget,
    page = 1,
    limit = 12,
    sort = "-createdAt",
  } = query;

  const filter = { status: "approved" };

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { country: { $regex: search, $options: "i" } },
      { city: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  if (category && category !== "All") {
    filter.category = category;
  }

  if (country) {
    filter.country = { $regex: country, $options: "i" };
  }

  if (minBudget || maxBudget) {
    filter.estimatedBudget = {};
    if (minBudget) filter.estimatedBudget.$gte = Number(minBudget);
    if (maxBudget) filter.estimatedBudget.$lte = Number(maxBudget);
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [destinations, total] = await Promise.all([
    Destination.find(filter)
      .populate("createdBy", "name profileImage role")
      .sort(sort)
      .skip(skip)
      .limit(Number(limit)),
    Destination.countDocuments(filter),
  ]);

  return {
    destinations,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / Number(limit)),
    },
  };
};

export const getDestinationById = async (id) => {
  const destination = await Destination.findById(id).populate(
    "createdBy",
    "name profileImage bio role"
  );
  if (!destination) {
    throw new ApiError(404, "Destination not found");
  }
  return destination;
};

export const createDestination = async (data, userId, userRole) => {
  const isAutoApproved = ["admin", "moderator"].includes(userRole);
  const destination = await Destination.create({
    ...data,
    createdBy: userId,
    status: isAutoApproved ? "approved" : "approved", // auto-approve initial submissions for instant UX
  });
  return destination;
};

export const updateDestination = async (id, data, user) => {
  const destination = await Destination.findById(id);
  if (!destination) {
    throw new ApiError(404, "Destination not found");
  }

  const isOwner = destination.createdBy.toString() === user._id.toString();
  const isAdmin = ["admin", "moderator"].includes(user.role);

  if (!isOwner && !isAdmin) {
    throw new ApiError(403, "You do not have permission to modify this destination");
  }

  Object.assign(destination, data);
  await destination.save();
  return destination;
};

export const deleteDestination = async (id, user) => {
  const destination = await Destination.findById(id);
  if (!destination) {
    throw new ApiError(404, "Destination not found");
  }

  const isOwner = destination.createdBy.toString() === user._id.toString();
  const isAdmin = ["admin", "moderator"].includes(user.role);

  if (!isOwner && !isAdmin) {
    throw new ApiError(403, "You do not have permission to delete this destination");
  }

  await destination.deleteOne();
  return { message: "Destination deleted successfully" };
};

