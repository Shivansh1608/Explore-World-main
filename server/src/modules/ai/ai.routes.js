import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler.js";

const router = Router();

router.post(
  "/recommend",
  asyncHandler(async (req, res) => {
    const { budget, duration, startingCity, interests } = req.body;

    const recommendations = [
      {
        destination: "Manali & Solang Valley",
        country: "India",
        category: "Mountains",
        estimatedCost: budget ? `₹${Math.min(budget, 8500)}` : "₹8,500",
        bestSeason: "October to June",
        itinerarySummary: `Day 1: Arrival & Mall Road. Day 2: Solang Valley adventure. Day 3: Old Manali & Hadimba Temple. Day 4: Return journey.`,
        highlights: ["Paragliding", "Snow views", "Cafes", "Riverside walks"],
      },
      {
        destination: "Rishikesh & Shivpuri",
        country: "India",
        category: "Adventure",
        estimatedCost: budget ? `₹${Math.min(budget, 7000)}` : "₹7,000",
        bestSeason: "September to April",
        itinerarySummary: `Day 1: Ganga Aarti & Beatles Ashram. Day 2: White water river rafting & Cliff jumping. Day 3: Waterfall trek & Yoga session.`,
        highlights: ["River Rafting", "Camping", "Spiritual Vibe", "Bungee Jumping"],
      },
    ];

    res.status(200).json({
      success: true,
      message: "AI recommendations generated",
      data: {
        summary: `Tailored travel plan for ${duration || "3-4 days"} with a budget of ₹${budget || "10,000"} departing from ${startingCity || "your city"}.`,
        recommendations,
        disclaimer: "AI-generated estimates are illustrative. Check real-time seasonal fares and weather before booking.",
      },
    });
  })
);

export default router;

