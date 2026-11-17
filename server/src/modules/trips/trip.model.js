import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema({
  day: { type: Number, required: true },
  date: Date,
  activities: [
    {
      title: String,
      description: String,
      destination: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Destination",
      },
      startTime: String,
      endTime: String,
    },
  ],
});

const tripSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    destinations: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Destination" },
    ],
    startDate: Date,
    endDate: Date,
    budget: { type: Number, min: 0 },
    itinerary: [itinerarySchema],
    visibility: {
      type: String,
      enum: ["private", "public"],
      default: "private",
    },
  },
  { timestamps: true }
);

const Trip = mongoose.model("Trip", tripSchema);
export default Trip;
