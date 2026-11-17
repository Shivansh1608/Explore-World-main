import { useState } from "react";
import { Sparkles, Send, Compass } from "lucide-react";

export default function AiAssistant() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi Aarav — I'm your travel thinking partner. Tell me what kind of escape you're craving.",
    },
  ]);
  const [input, setInput] = useState("");

  const quickPrompts = [
    "Suggest a trip under ₹10,000",
    "Best places in December",
    "Plan 5 days in Manali",
    "Near Mathura",
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const newMsgs = [...messages, { sender: "user", text: query }];
    setMessages(newMsgs);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages([
        ...newMsgs,
        {
          sender: "ai",
          text: `Here is a curated idea for "${query}": A 4-day escape starting with scenic road travel, cozy mountain homestays, and local artisanal food. Estimated budget: ₹9,200.`,
        },
      ]);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header with Circular Icon */}
      <div className="text-center space-y-3">
        <div className="w-14 h-14 rounded-full bg-[#00875a] text-white flex items-center justify-center mx-auto shadow-md">
          <Sparkles className="w-7 h-7 stroke-[2.2]" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          A little help finding your way
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
          A prepared interface for your future AI travel companion. This preview uses MOCK recommendations until Gemini is connected.
        </p>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-3xl border border-emerald-200/80 shadow-xs overflow-hidden">
        {/* Chat Header */}
        <div className="p-5 border-b border-emerald-100 bg-[#f0fbf6] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#00875a] text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">Explore guide</h3>
              <p className="text-[11px] text-[#00875a] font-medium">Mock mode • API-ready</p>
            </div>
          </div>
          <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
        </div>

        {/* Message Stream */}
        <div className="p-6 space-y-4 min-h-[280px]">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-md p-4 rounded-2xl text-xs leading-relaxed ${
                  m.sender === "user"
                    ? "bg-[#00875a] text-white rounded-br-xs"
                    : "bg-[#eaf4fc] text-slate-800 rounded-bl-xs"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-6 pb-4 flex flex-wrap gap-2">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              className="px-4 py-1.5 rounded-full border border-emerald-300 text-[11px] font-semibold text-[#00875a] bg-emerald-50/50 hover:bg-emerald-100 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask where to go, what to pack, or how to plan..."
            className="flex-1 bg-white border border-slate-200/90 rounded-full px-5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00875a]/30 focus:border-[#00875a]"
          />
          <button
            onClick={() => handleSend()}
            className="w-10 h-10 rounded-full bg-[#00875a] hover:bg-[#007048] text-white flex items-center justify-center transition-colors shrink-0 shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
