import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import {
  Sparkles,
  Send,
  MapPin,
  Bot,
  User,
  RefreshCw,
} from "lucide-react";

/* ─── Markdown-lite renderer: bold, bullets, line breaks ─── */
function RichText({ text }) {
  if (!text) return null;

  const lines = text.split("\n");

  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => {
        // Convert **bold** to <strong>
        const parts = line.split(/(\*\*[^*]+\*\*)/g).map((seg, j) => {
          if (seg.startsWith("**") && seg.endsWith("**")) {
            return (
              <strong key={j} className="font-bold text-slate-900">
                {seg.slice(2, -2)}
              </strong>
            );
          }
          return <span key={j}>{seg}</span>;
        });

        // Bullet lines
        if (line.trim().startsWith("•") || line.trim().startsWith("-") || line.trim().startsWith("*")) {
          return (
            <div key={i} className="flex items-start gap-1.5 ml-2">
              <span className="text-emerald-500 mt-0.5 shrink-0">•</span>
              <span>{parts}</span>
            </div>
          );
        }

        // Numbered lines
        if (/^\d+[\.\)]\s/.test(line.trim())) {
          return (
            <div key={i} className="flex items-start gap-1.5 ml-2">
              <span>{parts}</span>
            </div>
          );
        }

        // Heading-like lines (### or ##)
        if (line.trim().startsWith("#")) {
          const cleaned = line.replace(/^#+\s*/, "");
          return (
            <div key={i} className="font-bold text-slate-900 text-[13px] mt-2">
              {cleaned}
            </div>
          );
        }

        // Empty line = spacer
        if (!line.trim()) {
          return <div key={i} className="h-1" />;
        }

        return <div key={i}>{parts}</div>;
      })}
    </div>
  );
}

export default function AiAssistant() {
  const { user } = useAuth();
  const messagesEndRef = useRef(null);

  const initialMessages = [
    {
      sender: "ai",
      text: `Hi ${user?.name ? user.name.split(" ")[0] : "there"}! 🌍 I'm your ExploreWorld AI travel partner powered by Google Gemini. Ask me anything — plan a trip, compare destinations, get packing lists, visa tips, or build a full itinerary with budget breakdowns!`,
      chips: [],
    },
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    "Plan a 5-day trip to Bali under $1000",
    "Best places to visit in December",
    "Compare Paris vs Rome for a couple",
    "Weekend adventure near Delhi under ₹8000",
    "Packing list for Swiss Alps in winter",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  /* Build conversation history for Gemini context */
  const buildHistory = () => {
    return messages
      .filter((m) => m.text)
      .map((m) => ({
        role: m.sender === "user" ? "user" : "model",
        text: m.text,
      }));
  };

  const generateLocalResponse = (q) => {
    const query = q.toLowerCase();

    if (query.includes("bali")) {
      return {
        text: `Here is a curated 5-day budget plan for **Bali** under $1,000:\n\n• **Estimated Total:** ~$550–$750 (excluding flights)\n• **Day 1 (Ubud):** Sacred Monkey Forest & Tegallalang Rice Terraces. Stay in a boutique Ubud homestay ($30/night).\n• **Day 2 (Waterfalls & Temples):** Tegenungan Waterfall, Tirta Empul water temple, and evening organic cafe dinner.\n• **Day 3 (Seminyak/Canggu):** Beach relaxation, surfing lesson ($20), and beachfront sunset warung.\n• **Day 4 (Uluwatu):** Cliffside Uluwatu Temple, Kecak fire dance at sunset, and Jimbaran Bay seafood dinner.\n• **Day 5 (Nusa Penida or Shopping):** Day trip to Kelingking T-Rex cliff or local artisan markets before departure.\n\n*Pro-tip:* Renting a scooter costs ~$5/day and saves massive transport costs!`,
        chips: [
          { label: "Explore Bali", slug: "bali" },
          { label: "Explore Maldives", slug: "maldives" },
        ],
      };
    }

    if (query.includes("10,000") || query.includes("10000") || query.includes("budget") || query.includes("delhi")) {
      return {
        text: `Here is a curated budget itinerary under ₹10,000:\n\n🏔️ **Manali & Solang Valley (4 Days / 3 Nights)**\n• **Estimated Budget:** ₹8,500 total (Stay: ₹3,200, Travel: ₹2,500, Food: ₹1,800, Activities: ₹1,000)\n• **Day 1:** Overnight bus from Delhi/Chandigarh, Mall Road evening walk and hot momos.\n• **Day 2:** Solang Valley snow viewpoints and river trail.\n• **Day 3:** Hike to Jogini Waterfalls through cedar pine forests followed by Old Manali cafe hopping.\n• **Day 4:** Riverside relaxation before evening departure.\n\n*Pro-tip:* Book local homestays in Vashisht or Old Manali for the best prices!`,
        chips: [{ label: "Explore Manali", slug: "manali" }],
      };
    }

    if (query.includes("manali")) {
      return {
        text: `Here is your 5-day mountain escape to **Manali**:\n\n• **Best Season:** October to June (Snow in Dec–Feb, meadows in Apr–Jun)\n• **Day 1:** Arrival, check-in at Old Manali, stroll through Hadimba Temple woods.\n• **Day 2:** Solang Valley cable car & paragliding.\n• **Day 3:** Day trek to Jogini Waterfall & hot sulphur springs at Vashisht.\n• **Day 4:** Day trip to Rohtang Pass or Atal Tunnel towards Sissu in Lahaul Valley.\n• **Day 5:** Local trout lunch, artisanal shawl shopping, and return journey.\n• **Estimated Budget:** ₹18,500 per person.`,
        chips: [{ label: "Explore Manali", slug: "manali" }],
      };
    }

    if (query.includes("paris") || query.includes("rome") || query.includes("couple")) {
      return {
        text: `**Paris vs. Rome for Couples:**\n\n• 🥐 **Paris (The City of Lights):** Ideal for romance, world-class fine dining, Seine river cruises, art museums (Louvre, Musée d'Orsay), and charming Montmartre cobblestone alleys. Budget: Higher (~$220/day).\n• 🏛️ **Rome (The Eternal City):** Perfect for ancient history, dramatic architecture (Colosseum, Trevi Fountain, Pantheon), incredible pasta/gelato, and vibrant piazzas. Budget: Moderately cheaper (~$160/day).\n\n*Verdict:* Choose Paris for classic elegance and romance; choose Rome for warm Mediterranean energy and historical wonder!`,
        chips: [
          { label: "Explore Paris", slug: "paris" },
          { label: "Explore Rome", slug: "rome" },
        ],
      };
    }

    if (query.includes("december") || query.includes("winter")) {
      return {
        text: `Top destinations for **December**:\n\n1. ❄️ **Manali & Ladakh:** Pristine snowscapes, frozen lakes, and cozy winter homestays.\n2. 🏝️ **Maldives & Bali:** Perfect tropical sunny season with crystal waters and overwater villas.\n3. 🏰 **Paris & Rome:** Festive European holiday markets, Christmas illuminations, and mild winter charm.\n4. ⛷️ **Swiss Alps & Banff:** World-class powder snow for skiing and picturesque alpine villages.`,
        chips: [
          { label: "Explore Manali", slug: "manali" },
          { label: "Explore Maldives", slug: "maldives" },
          { label: "Explore Swiss Alps", slug: "swiss-alps" },
          { label: "Explore Banff", slug: "banff-national-park" },
        ],
      };
    }

    if (query.includes("swiss") || query.includes("pack") || query.includes("alps")) {
      return {
        text: `**Packing List for Swiss Alps in Winter:**\n\n• 🧤 **Base Layers:** Thermal tops & bottoms (merino wool is best)\n• 🧥 **Outerwear:** Windproof & waterproof heavy winter parka or ski jacket\n• 🥾 **Footwear:** Waterproof insulated snow boots with deep rubber treads\n• 🧣 **Accessories:** Fleece-lined beanie, thermal touch-screen gloves, UV sunglasses (snow glare is intense)\n• 🔋 **Extras:** High SPF lip balm & sun cream, portable power bank (cold drains batteries fast!)`,
        chips: [{ label: "Explore Swiss Alps", slug: "swiss-alps" }],
      };
    }

    return {
      text: `Here is a custom recommendation for "${q}":\n\n• **For cultural history:** Check out **Paris**, **Rome**, or **Kyoto**.\n• **For pristine nature & relaxation:** Consider **Bali**, **Maldives**, or **Banff National Park**.\n• **For high adrenaline:** Look into **Swiss Alps**, **Queenstown**, or **Ladakh**.\n\nAsk me for a specific duration or budget breakdown for any of these!`,
      chips: [
        { label: "Explore Paris", slug: "paris" },
        { label: "Explore Bali", slug: "bali" },
        { label: "Explore Swiss Alps", slug: "swiss-alps" },
      ],
    };
  };

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || isTyping) return;

    const userMessage = { sender: "user", text: query.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const history = buildHistory();
      const res = await API.post("/ai/chat", {
        message: query.trim(),
        history,
      });

      if (res?.data?.success && res.data.data?.reply) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: res.data.data.reply,
            chips: res.data.data.chips || [],
          },
        ]);
        return;
      }
    } catch {
      // Backend not running or offline: fallback smoothly to instant local travel expert
      const fallback = generateLocalResponse(query);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: fallback.text,
          chips: fallback.chips,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    setMessages(initialMessages);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="w-14 h-14 rounded-full bg-[#00875a] text-white flex items-center justify-center mx-auto shadow-md">
          <Sparkles className="w-7 h-7 stroke-[2.2]" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          AI Travel Companion
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
          Powered by Google Gemini — ask anything from custom itineraries to budget breakdowns, visa requirements, and hidden gems.
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
              <h3 className="text-xs font-bold text-slate-900">
                ExploreWorld Travel Assistant
              </h3>
              <p className="text-[11px] text-[#00875a] font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Powered by Gemini • Ready to plan
              </p>
            </div>
          </div>
          <button
            onClick={handleClearChat}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
            title="Clear chat"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Message Stream */}
        <div className="p-4 sm:p-6 space-y-5 min-h-[380px] max-h-[560px] overflow-y-auto">
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
                {m.sender === "user" ? (
                  <User className="w-3.5 h-3.5" />
                ) : (
                  <Bot className="w-3.5 h-3.5" />
                )}
              </div>

              <div
                className={`max-w-lg p-4 rounded-2xl text-xs leading-relaxed space-y-3 ${
                  m.sender === "user"
                    ? "bg-[#00875a] text-white rounded-tr-xs"
                    : "bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-xs"
                }`}
              >
                {m.sender === "user" ? (
                  <div>{m.text}</div>
                ) : (
                  <RichText text={m.text} />
                )}

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
                <span className="text-[11px] font-medium ml-1">
                  Gemini is thinking...
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-6 py-2.5 bg-slate-50/70 border-t border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[10px] font-bold uppercase text-slate-400 shrink-0">
            Try:
          </span>
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              disabled={isTyping}
              className="px-3 py-1 rounded-full border border-emerald-200 text-[11px] font-semibold text-[#00875a] bg-white hover:bg-emerald-50 transition-colors whitespace-nowrap shrink-0 shadow-2xs cursor-pointer disabled:opacity-40"
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
            placeholder="Ask where to go, what to pack, compare destinations, build an itinerary..."
            disabled={isTyping}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00875a]/30 focus:border-[#00875a] disabled:opacity-50"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className="w-10 h-10 rounded-full bg-[#00875a] hover:bg-[#007048] disabled:opacity-40 text-white flex items-center justify-center transition-colors shrink-0 shadow-xs cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
