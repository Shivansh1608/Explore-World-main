import { useState } from "react";
import API from "../../services/api";
import { Sparkles, Compass, Calendar, DollarSign, MapPin, Send } from "lucide-react";

export default function AiAssistant() {
  const [budget, setBudget] = useState("10000");
  const [duration, setDuration] = useState("4 days");
  const [startingCity, setStartingCity] = useState("Delhi");
  const [interests, setInterests] = useState("Mountains, scenic photography, trekking");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/ai/recommend", {
        budget: Number(budget),
        duration,
        startingCity,
        interests,
      });
      setResponse(res.data.data);
    } catch (err) {
      alert("Failed to contact AI travel planner");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5" /> AI Travel Architect
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-2 sm:text-4xl">
          Smart Travel Recommendations
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-lg mx-auto">
          Tell us your budget, home city, and preferred vibe. Our AI assistant will formulate curated itineraries and cost breakdowns.
        </p>
      </div>

      {/* Input Form */}
      <form onSubmit={handleGenerate} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Estimated Budget (₹)
            </label>
            <input
              type="number"
              required
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Duration
            </label>
            <input
              type="text"
              required
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g. 4 days / weekend"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Starting From
            </label>
            <input
              type="text"
              required
              value={startingCity}
              onChange={(e) => setStartingCity(e.target.value)}
              placeholder="e.g. Mumbai, Mathura..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Travel Style & Interests
          </label>
          <input
            type="text"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="e.g. Peaceful beaches, street food, river rafting..."
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4" /> {loading ? "Analyzing Travel Scenarios..." : "Generate AI Itinerary"}
        </button>
      </form>

      {/* AI Output Result */}
      {response && (
        <div className="space-y-6">
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 font-medium">
            {response.summary}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {response.recommendations.map((rec, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {rec.category}
                    </span>
                    <span className="text-sm font-black text-slate-900">
                      {rec.estimatedCost}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{rec.destination}</h3>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> Best Season: {rec.bestSeason}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <span className="text-xs uppercase font-bold text-slate-400 block mb-1">Suggested Itinerary</span>
                    <p className="text-xs text-slate-600 leading-relaxed">{rec.itinerarySummary}</p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {rec.highlights.map((h, i) => (
                      <span key={i} className="text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-400 text-center italic mt-4">
            {response.disclaimer}
          </p>
        </div>
      )}
    </div>
  );
}
