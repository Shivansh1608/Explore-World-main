import { Router } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import asyncHandler from "../../utils/asyncHandler.js";

const router = Router();

/* ───────── Gemini Setup ───────── */
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const MODEL_PREFERENCE = ["gemini-3.8-flash", "gemini-2.0-flash-lite"];

/** Try preferred models in order; retry once on 503 */
async function getWorkingModel(opts) {
  for (const name of MODEL_PREFERENCE) {
    try {
      return genAI.getGenerativeModel({ model: name, ...opts });
    } catch {
      continue;
    }
  }
  return genAI.getGenerativeModel({ model: MODEL_PREFERENCE[0], ...opts });
}

async function callWithRetry(fn, retries = 2) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (err.status === 503 && i < retries - 1) {
        await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
        continue;
      }
      throw err;
    }
  }
}

const SYSTEM_PROMPT = `You are the ExploreWorld AI Travel Companion — a world-class travel expert embedded in a travel planning website.

PERSONALITY: Friendly, enthusiastic, deeply knowledgeable. Use relevant emojis sparingly. Give specific, actionable advice — never generic filler.

YOUR KNOWLEDGE — ExploreWorld has these curated destinations:
Paris, Bali, Kyoto, Manali, Swiss Alps, Maldives, New York City, Santorini, Cairo, Machu Picchu, Dubai, Rome, Banff National Park, Serengeti, Ladakh, Rio de Janeiro, Queenstown, Tokyo.

WHAT YOU CAN DO:
• Build day-by-day itineraries with specific activities, timings, and costs in the traveler's currency
• Compare destinations (e.g. "Bali vs Maldives for honeymoon")
• Suggest packing lists, visa requirements, safety tips, local food, hidden gems
• Plan trips around a budget, duration, travel style (solo / couple / family / adventure / luxury)
• Recommend the best season/month to visit any place
• Answer any travel, geography, culture, or tourism question worldwide — not limited to ExploreWorld destinations

FORMAT RULES:
• Use **bold** for place names and key highlights
• Use bullet points (•) for lists
• Keep responses comprehensive but scannable — aim for 150-300 words
• End with a follow-up question or suggestion to keep the conversation going
• If the user mentions an ExploreWorld destination, include a note like: "📍 You can explore the full details on our [destination] page!"

IMPORTANT: You are a travel expert. Do NOT refuse travel questions. Do NOT say you're "just an AI". Answer confidently with real-world travel knowledge.`;

/* ───────── Chat endpoint ───────── */
router.post(
  "/chat",
  asyncHandler(async (req, res) => {
    const { message, history } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ success: false, message: "Message is required" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ success: false, message: "AI service not configured" });
    }

    const model = genAI.getGenerativeModel({
      model: MODEL_PREFERENCE[0],
      systemInstruction: SYSTEM_PROMPT,
    });

    // Build chat history from frontend messages
    const chatHistory = [];
    if (Array.isArray(history)) {
      for (const h of history) {
        if (h.role && h.text) {
          chatHistory.push({
            role: h.role === "user" ? "user" : "model",
            parts: [{ text: h.text }],
          });
        }
      }
    }

    const chat = model.startChat({ history: chatHistory });
    const result = await callWithRetry(() => chat.sendMessage(message));
    const reply = result.response.text();

    // Extract destination slugs mentioned in the response for clickable chips
    const destinations = [
      { name: "Paris", slug: "paris" },
      { name: "Bali", slug: "bali" },
      { name: "Kyoto", slug: "kyoto" },
      { name: "Manali", slug: "manali" },
      { name: "Swiss Alps", slug: "swiss-alps" },
      { name: "Maldives", slug: "maldives" },
      { name: "New York", slug: "new-york-city" },
      { name: "NYC", slug: "new-york-city" },
      { name: "Santorini", slug: "santorini" },
      { name: "Cairo", slug: "cairo" },
      { name: "Machu Picchu", slug: "machu-picchu" },
      { name: "Dubai", slug: "dubai" },
      { name: "Rome", slug: "rome" },
      { name: "Banff", slug: "banff-national-park" },
      { name: "Serengeti", slug: "serengeti" },
      { name: "Ladakh", slug: "ladakh" },
      { name: "Rio de Janeiro", slug: "rio-de-janeiro" },
      { name: "Rio", slug: "rio-de-janeiro" },
      { name: "Queenstown", slug: "queenstown" },
      { name: "Tokyo", slug: "tokyo" },
    ];

    const mentionedChips = [];
    const seen = new Set();
    for (const d of destinations) {
      if (reply.toLowerCase().includes(d.name.toLowerCase()) && !seen.has(d.slug)) {
        seen.add(d.slug);
        mentionedChips.push({ label: `Explore ${d.name}`, slug: d.slug });
      }
    }

    res.status(200).json({
      success: true,
      data: {
        reply,
        chips: mentionedChips.slice(0, 4), // max 4 chips
      },
    });
  })
);

/* ───────── Legacy recommend endpoint (backwards compat) ───────── */
router.post(
  "/recommend",
  asyncHandler(async (req, res) => {
    const { budget, duration, startingCity, interests } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      // Fallback to static if no key
      return res.status(200).json({
        success: true,
        data: {
          summary: "AI service not configured",
          recommendations: [],
        },
      });
    }

    const model = genAI.getGenerativeModel({
      model: MODEL_PREFERENCE[0],
      systemInstruction: SYSTEM_PROMPT,
    });

    const prompt = `Give me 2 travel destination recommendations based on:
- Budget: ${budget || "flexible"}
- Duration: ${duration || "3-5 days"}
- Starting from: ${startingCity || "not specified"}
- Interests: ${interests || "general exploration"}

Respond in JSON format only (no markdown, no code fences) with this structure:
{"recommendations":[{"destination":"...","country":"...","category":"...","estimatedCost":"...","bestSeason":"...","itinerarySummary":"...","highlights":["..."]}]}`;

    const result = await callWithRetry(() => model.generateContent(prompt));
    const text = result.response.text().replace(/```json\n?|\n?```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = { recommendations: [] };
    }

    res.status(200).json({
      success: true,
      message: "AI recommendations generated",
      data: {
        summary: `Tailored travel plan for ${duration || "3-5 days"} with a budget of ${budget || "flexible"} departing from ${startingCity || "your city"}.`,
        recommendations: parsed.recommendations || [],
        disclaimer: "AI-generated estimates. Check real-time fares and weather before booking.",
      },
    });
  })
);

export default router;
