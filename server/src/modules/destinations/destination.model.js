import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    description: {
      type: String,
      required: true,
      maxlength: 5000,
    },
    country: {
      type: String,
      required: true,
      index: true,
    },
    state: String,
    city: String,
    category: [
      {
        type: String,
        enum: [
          "Mountains",
          "Beaches",
          "Historical",
          "Adventure",
          "Religious",
          "Wildlife",
          "Other",
        ],
      },
    ],
    images: [{ url: String, publicId: String }],
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    estimatedBudget: {
      type: Number,
      min: 0,
    },
    bestTimeToVisit: [String],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },
  },
  { timestamps: true }
);

destinationSchema.index({ location: "2dsphere" });
destinationSchema.index({
  name: "text",
  description: "text",
  country: "text",
  city: "text",
});

const Destination = mongoose.model("Destination", destinationSchema);
export default Destination;
