import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import {
  Sparkles,
  Send,
  Compass,
  ArrowRight,
  MapPin,
  Calendar,
  Wallet,
  Bot,
  User,
} from "lucide-react";

export default function AiAssistant() {
  const { user } = useAuth();
  const messagesEndRef = useRef(null);

  const initialMessages = [
    {
      sender: "ai",
      text: `Hi ${user?.name ? user.name.split(" ")[0] : "there"}! 🌍 I'm your ExploreWorld AI travel partner. Tell me what kind of journey you have in mind — whether you're looking for a mountain trek, tropical beach escape, or a budget trip under ₹10,000.`,
      chips: [],
    },
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    "Suggest a trip under ₹10,000",
    "Plan 5 days in Manali",
    "Best places in December",
    "Beach vacation in Bali",
    "Adventure in the Swiss Alps",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateLocalResponse = (q) => {
    const query = q.toLowerCase();

    if (query.includes("10,000") || query.includes("10000") || query.includes("budget")) {
      return {
        text: `Here is a curated budget itinerary under ₹10,000:\n\n🏔️ **Manali & Solang Valley (4 Days / 3 Nights)**\n• **Estimated Budget:** ₹8,500 total (Stay: ₹3,200, Travel: ₹2,500, Food: ₹1,800, Activities: ₹1,000)\n• **Day 1:** Overnight bus from Delhi/Chandigarh, Mall Road evening walk and hot momos.\n• **Day 2:** Solang Valley snow viewpoints and Solang river trail.\n• **Day 3:** Hike to Jogini Waterfalls through cedar pine forests followed by Old Manali cafe hopping.\n• **Day 4:** Riverside relaxation before evening departure.\n\n*Pro-tip:* Book local homestays in Vashisht or Old Manali for the best prices!`,
        chips: [{ label: "View Manali Details", slug: "manali" }],
      };
    }

    if (query.includes("manali")) {
      return {
        text: `Here is your detailed 5-day mountain escape to **Manali**:\n\n• **Best Season:** October to June (Snow in Dec–Feb, alpine meadows in Apr–Jun)\n• **Day 1:** Arrival, check-in at Old Manali, stroll through Hadimba Temple woods.\n• **Day 2:** Solang Valley cable car & paragliding.\n• **Day 3:** Day trek to Jogini Waterfall & hot sulphur springs at Vashisht.\n• **Day 4:** Day trip to Rohtang Pass or Atal Tunnel towards Sissu in Lahaul Valley.\n• **Day 5:** Local trout lunch, artisanal shawl shopping, and return journey.\n• **Estimated Budget:** ₹18,500 per person.`,
        chips: [{ label: "View Manali Destination", slug: "manali" }],
      };
    }

    if (query.includes("bali") || query.includes("beach")) {
      return {
        text: `For a dream tropical getaway, **Bali** is tough to beat!\n\n• **Ideal Duration:** 6–7 Days\n• **Highlights:** Tegallalang rice terraces in Ubud, Uluwatu sunset fire dance, and snorkeling at Nusa Penida.\n• **Recommended Budget:** ₹42,000 (excluding international flights).\n• **Best Time:** May to October during dry, sunny trade winds.\n• **Food to Try:** Nasi Campur, smoothie bowls in Canggu, and fresh seaside seafood in Jimbaran Bay.`,
        chips: [
          { label: "View Bali Details", slug: "bali" },
          { label: "View Maldives", slug: "maldives" },
        ],
      };
    }

    if (query.includes("december") || query.includes("winter")) {
      return {
        text: `Top destinations for **December**:\n\n1. ❄️ **Manali & Himalayas:** For pristine snow-clad landscapes, cozy wooden cabins, and winter sports.\n2. 🏝️ **Maldives:** Perfect tropical dry season with calm azure waters and luxury overwater villas.\n3. 🏰 **Paris:** Festive Christmas markets along the Champs-Élysées and illuminated monuments.\n4. ⛷️ **Swiss Alps:** World-class alpine ski runs and mountain train journeys.`,
        chips: [
          { label: "Manali", slug: "manali" },
          { label: "Maldives", slug: "maldives" },
          { label: "Paris", slug: "paris" },
          { label: "Swiss Alps", slug: "swiss-alps" },
        ],
      };
    }

    if (query.includes("swiss") || query.includes("alps")) {
      return {
        text: `**Swiss Alps & Interlaken (5 Days Alpine Dream)**:\n\n• **Highlights:** Jungfraujoch "Top of Europe" cogwheel train, Lake Brienz cruising, and cliff walks at Grindelwald First.\n• **Estimated Budget:** ₹1,48,000.\n• **Best Time to Visit:** June to August for alpine wildflower hiking, or Dec–Feb for skiing.\n• **Travel Tip:** Get the Swiss Travel Pass for unlimited scenic train, bus, and boat rides!`,
        chips: [{ label: "View Swiss Alps Details", slug: "swiss-alps" }],
      };
    }

    // Default intelligent response
    return {
      text: `Based on your request for "${q}", I recommend checking out our top curated destinations. For cultural wonders, **Paris** and **Kyoto** offer breathtaking heritage. For nature and relaxation, consider **Bali** or **Manali**.\n\nTell me your expected travel budget or preferred travel dates, and I'll tailor a custom day-by-day plan!`,
      chips: [
        { label: "Explore Manali", slug: "manali" },
        { label: "Explore Bali", slug: "bali" },
        { label: "Explore Paris", slug: "paris" },
      ],
    };
  };

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMessage = { sender: "user", text: query.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      // Attempt backend AI endpoint
      const res = await API.post("/ai/recommend", {
        interests: query,
        startingCity: "Delhi",
      });

      if (res?.data?.data?.recommendations?.length > 0) {
        const rec = res.data.data.recommendations[0];
        const formatted = `Here is a custom plan for "${query}":\n\n📍 **${rec.destination} (${rec.country})**\n• **Category:** ${rec.category}\n• **Estimated Cost:** ${rec.estimatedCost}\n• **Best Season:** ${rec.bestSeason}\n• **Itinerary:** ${rec.itinerarySummary}\n• **Highlights:** ${rec.highlights.join(", ")}`;

        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              sender: "ai",
              text: formatted,
              chips: [{ label: `View ${rec.destination}`, slug: rec.destination.toLowerCase().includes("manali") ? "manali" : "bali" }],
            },
          ]);
          setIsTyping(false);
        }, 500);
        return;
      }
    } catch {
      // Fallback to local intelligent travel planner
    }

    setTimeout(() => {
      const generated = generateLocalResponse(query);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: generated.text,
          chips: generated.chips,
        },
      ]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header with Circular Icon */}
      <div className="text-center space-y-3">
        <div className="w-14 h-14 rounded-full bg-[#00875a] text-white flex items-center justify-center mx-auto shadow-md">
          <Sparkles className="w-7 h-7 stroke-[2.2]" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          AI Travel Companion
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
          Ask anything from custom budget plans to day-by-day itineraries, season timings, and packing lists.
        </p>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col">
        {/* Chat Header */}
        <div className="p-4 sm:p-5 border-b border-emerald-100 bg-[#f0fbf6] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#00875a] text-white flex items-center justify-center shadow-xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">ExploreWorld Travel Assistant</h3>
              <p className="text-[11px] text-[#00875a] font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Online • Ready to plan
              </p>
            </div>
          </div>
        </div>

        {/* Message Stream */}
        <div className="p-4 sm:p-6 space-y-5 min-h-[340px] max-h-[520px] overflow-y-auto">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 ${
                m.sender === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${
                  m.sender === "user"
                    ? "bg-slate-900 text-white"
                    : "bg-[#00875a] text-white"
                }`}
              >
                {m.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              <div
                className={`max-w-lg p-4 rounded-2xl text-xs leading-relaxed space-y-3 ${
                  m.sender === "user"
                    ? "bg-[#00875a] text-white rounded-tr-xs"
                    : "bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-xs whitespace-pre-line"
                }`}
              >
                <div>{m.text}</div>

                {/* Clickable Destination Chips */}
                {m.chips && m.chips.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200/60">
                    {m.chips.map((chip, idx) => (
                      <Link
                        key={idx}
                        to={`/destinations/${chip.slug}`}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-emerald-300 rounded-full text-[11px] font-bold text-[#00875a] hover:bg-emerald-50 shadow-xs transition-colors"
                      >
                        <MapPin className="w-3 h-3" />
                        {chip.label} &gt;
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#00875a] text-white flex items-center justify-center shrink-0">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-2xl rounded-tl-xs text-xs text-slate-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] font-medium ml-1">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-6 py-2.5 bg-slate-50/70 border-t border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[10px] font-bold uppercase text-slate-400 shrink-0">
            Suggestions:
          </span>
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              className="px-3 py-1 rounded-full border border-emerald-200 text-[11px] font-semibold text-[#00875a] bg-white hover:bg-emerald-50 transition-colors whitespace-nowrap shrink-0 shadow-2xs cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-100 bg-white flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask where to go, what to pack, or how to plan your budget..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00875a]/30 focus:border-[#00875a]"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="w-10 h-10 rounded-full bg-[#00875a] hover:bg-[#007048] disabled:opacity-40 text-white flex items-center justify-center transition-colors shrink-0 shadow-xs cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
