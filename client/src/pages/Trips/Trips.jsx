import { useState, useEffect } from "react";
import {
  Plus,
  Users,
  Calendar,
  Wallet,
  CheckCircle2,
  MapPin,
  X,
  Trash2,
  Check,
  Compass,
} from "lucide-react";

export default function Trips() {
  const initialTrips = [
    {
      id: "trip-1",
      title: "Manali Adventure",
      destination: "Himachal Pradesh, India",
      dates: "12–16 Oct 2025",
      daysCount: 5,
      budget: 48500,
      travellers: 3,
      weather: {
        temp: "14°C day / 4°C night",
        headline: "Clear Himalayan skies",
        note: "Pack thermal layers for morning valley hikes.",
      },
      itinerary: [
        {
          id: "stop-1",
          day: "01",
          title: "Arrival in Manali",
          desc: "Check in, meet your local host and take a slow walk through the old town.",
          spot: "Mall Road",
          completed: true,
        },
        {
          id: "stop-2",
          day: "02",
          title: "Solang Valley Adventure",
          desc: "Alpine views, cable car ascent, and evening chai with mountain views.",
          spot: "Solang Valley Ridge",
          completed: true,
        },
        {
          id: "stop-3",
          day: "03",
          title: "Jogini Waterfall Hike",
          desc: "Morning hike through pine forests followed by riverside picnic.",
          spot: "Vashisht Hot Springs",
          completed: false,
        },
      ],
    },
    {
      id: "trip-2",
      title: "Bali Tropical Retreat",
      destination: "Ubud & Canggu, Indonesia",
      dates: "20–27 Nov 2025",
      daysCount: 7,
      budget: 72000,
      travellers: 2,
      weather: {
        temp: "29°C sunny / 24°C night",
        headline: "Tropical Island Warmth",
        note: "Light linen clothing and reef-safe sunscreen recommended.",
      },
      itinerary: [
        {
          id: "stop-201",
          day: "01",
          title: "Ubud Arrival & Rice Field Walk",
          desc: "Check in at eco-villa, evening stroll through Campuhan Ridge.",
          spot: "Campuhan Ridge Walk",
          completed: true,
        },
        {
          id: "stop-202",
          day: "02",
          title: "Sacred Water Temples",
          desc: "Morning spiritual blessing at Tirta Empul and traditional artisan markets.",
          spot: "Tirta Empul",
          completed: false,
        },
      ],
    },
  ];

  const [trips, setTrips] = useState(() => {
    try {
      const saved = localStorage.getItem("explore_world_trips");
      return saved ? JSON.parse(saved) : initialTrips;
    } catch {
      return initialTrips;
    }
  });

  const [activeTripId, setActiveTripId] = useState(trips[0]?.id || "trip-1");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAddStopModal, setShowAddStopModal] = useState(false);

  // New trip form state
  const [newTitle, setNewTitle] = useState("");
  const [newDestination, setNewDestination] = useState("");
  const [newDates, setNewDates] = useState("");
  const [newBudget, setNewBudget] = useState(35000);
  const [newTravellers, setNewTravellers] = useState(2);

  // New stop form state
  const [stopDay, setStopDay] = useState("01");
  const [stopTitle, setStopTitle] = useState("");
  const [stopDesc, setStopDesc] = useState("");
  const [stopLocation, setStopLocation] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("explore_world_trips", JSON.stringify(trips));
    } catch (e) {
      console.warn("Failed to persist trips:", e);
    }
  }, [trips]);

  const activeTrip = trips.find((t) => t.id === activeTripId) || trips[0];

  const handleCreateTrip = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created = {
      id: "trip-" + Date.now(),
      title: newTitle.trim(),
      destination: newDestination.trim() || "Global Destination",
      dates: newDates.trim() || "Upcoming",
      daysCount: 4,
      budget: Number(newBudget) || 30000,
      travellers: Number(newTravellers) || 2,
      weather: {
        temp: "22°C day",
        headline: "Ideal Travel Weather",
        note: "Seasonal breezes and pleasant conditions.",
      },
      itinerary: [
        {
          id: "stop-new-1",
          day: "01",
          title: "Arrival & Orientation",
          desc: "Settle into accommodation and explore neighborhood cafes.",
          spot: newDestination || "Local Center",
          completed: false,
        },
      ],
    };

    const updated = [created, ...trips];
    setTrips(updated);
    setActiveTripId(created.id);
    setShowCreateModal(false);

    // Reset inputs
    setNewTitle("");
    setNewDestination("");
    setNewDates("");
  };

  const handleToggleStop = (stopId) => {
    if (!activeTrip) return;
    setTrips((prev) =>
      prev.map((t) => {
        if (t.id === activeTrip.id) {
          return {
            ...t,
            itinerary: t.itinerary.map((s) =>
              s.id === stopId ? { ...s, completed: !s.completed } : s
            ),
          };
        }
        return t;
      })
    );
  };

  const handleAddStop = (e) => {
    e.preventDefault();
    if (!stopTitle.trim() || !activeTrip) return;

    const newStop = {
      id: "stop-" + Date.now(),
      day: stopDay.padStart(2, "0"),
      title: stopTitle.trim(),
      desc: stopDesc.trim() || "Explore and enjoy local highlights.",
      spot: stopLocation.trim() || activeTrip.destination,
      completed: false,
    };

    setTrips((prev) =>
      prev.map((t) => {
        if (t.id === activeTrip.id) {
          return {
            ...t,
            itinerary: [...t.itinerary, newStop],
          };
        }
        return t;
      })
    );

    setStopTitle("");
    setStopDesc("");
    setStopLocation("");
    setShowAddStopModal(false);
  };

  const handleDeleteTrip = (tripId) => {
    if (trips.length <= 1) {
      alert("You need at least one trip in your planner!");
      return;
    }
    if (window.confirm("Are you sure you want to delete this trip plan?")) {
      const remaining = trips.filter((t) => t.id !== tripId);
      setTrips(remaining);
      setActiveTripId(remaining[0].id);
    }
  };

  // Calculations
  const completedStops = activeTrip?.itinerary.filter((s) => s.completed).length || 0;
  const totalStops = activeTrip?.itinerary.length || 1;
  const progressPercent = Math.round((completedStops / totalStops) * 100);

  const budget = activeTrip?.budget || 40000;
  const stayCost = Math.round(budget * 0.45);
  const foodCost = Math.round(budget * 0.25);
  const moveCost = Math.round(budget * 0.18);
  const funCost = Math.round(budget * 0.12);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Trip Planner</h1>
          <p className="text-xs text-slate-500 mt-1">
            Organize itineraries, budget breakdowns, and daily adventure stops.
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#00875a] hover:bg-[#007048] text-white text-xs font-bold rounded-full shadow-sm transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 stroke-[3]" /> Create New Trip
        </button>
      </div>

      {/* Trips switcher pill tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {trips.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTripId(t.id)}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTrip?.id === t.id
                ? "bg-[#00875a] text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {t.title}
          </button>
        ))}
      </div>

      {activeTrip && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Itinerary Detail Card */}
          <div className="lg:col-span-8 bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-8">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-[#00875a] border border-emerald-200/60 rounded-full">
                  Upcoming • {activeTrip.dates}
                </span>
                <button
                  onClick={() => handleDeleteTrip(activeTrip.id)}
                  title="Delete this trip"
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{activeTrip.title}</h2>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                {activeTrip.destination} • {activeTrip.daysCount} days
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Budget
                </span>
                <span className="text-base font-black text-slate-900">
                  ₹{activeTrip.budget.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Travellers
                </span>
                <span className="text-base font-black text-slate-900">
                  {activeTrip.travellers} {activeTrip.travellers === 1 ? "person" : "people"}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Planned Stops
                </span>
                <span className="text-base font-black text-slate-900">
                  {completedStops}/{totalStops} ({progressPercent}%)
                </span>
              </div>
            </div>

            {/* Day by Day Timeline */}
            <div className="space-y-6 pt-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Daily Itinerary & Activities
                </h3>
                <button
                  onClick={() => setShowAddStopModal(true)}
                  className="text-xs font-bold text-[#00875a] hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Activity Stop
                </button>
              </div>

              {activeTrip.itinerary.map((item, idx) => (
                <div key={item.id} className="flex items-start gap-4 relative group">
                  {idx < activeTrip.itinerary.length - 1 && (
                    <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-emerald-100" />
                  )}
                  <button
                    onClick={() => handleToggleStop(item.id)}
                    title={item.completed ? "Mark as pending" : "Mark as completed"}
                    className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center shrink-0 z-10 shadow-xs transition-colors cursor-pointer ${
                      item.completed
                        ? "bg-[#00875a] text-white"
                        : "bg-slate-100 text-slate-600 border border-slate-300 hover:bg-emerald-50"
                    }`}
                  >
                    {item.completed ? <Check className="w-4 h-4 stroke-[3]" /> : item.day}
                  </button>

                  <div className="flex-1 space-y-1 pt-0.5">
                    <div className="flex items-center justify-between">
                      <h4
                        className={`text-sm font-bold transition-all ${
                          item.completed ? "line-through text-slate-400" : "text-slate-900"
                        }`}
                      >
                        {item.title}
                      </h4>
                      <span className="text-[11px] font-mono font-medium text-slate-400">
                        Day {item.day}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                    <p className="text-[11px] font-semibold text-[#00875a] flex items-center gap-1 pt-0.5">
                      <MapPin className="w-3 h-3" /> {item.spot}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar: Spend overview & Weather */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Estimated Spend Breakdown</h3>
              <div className="flex items-end gap-2 h-28 pt-4">
                <div
                  className="flex-1 bg-[#00875a] h-full rounded-lg transition-all"
                  title={`Stay: ₹${stayCost.toLocaleString()}`}
                />
                <div
                  className="flex-1 bg-[#00a36c] h-3/5 rounded-lg transition-all"
                  title={`Food: ₹${foodCost.toLocaleString()}`}
                />
                <div
                  className="flex-1 bg-[#38b28a] h-2/5 rounded-lg transition-all"
                  title={`Move: ₹${moveCost.toLocaleString()}`}
                />
                <div
                  className="flex-1 bg-[#7ad4b3] h-1/3 rounded-lg transition-all"
                  title={`Fun: ₹${funCost.toLocaleString()}`}
                />
              </div>

              <div className="flex justify-between text-[11px] text-slate-500 font-semibold px-1">
                <span>Stay (₹{stayCost.toLocaleString()})</span>
                <span>Food (₹{foodCost.toLocaleString()})</span>
                <span>Move (₹{moveCost.toLocaleString()})</span>
                <span>Fun (₹{funCost.toLocaleString()})</span>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Total Trip Target</span>
                <span className="text-sm font-black text-slate-900">
                  ₹{activeTrip.budget.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Weather Window Box */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-2 shadow-xs">
              <span className="text-[11px] uppercase tracking-wider font-bold text-amber-400">
                Weather Advisory
              </span>
              <h4 className="text-lg font-black tracking-tight">{activeTrip.weather?.headline}</h4>
              <p className="text-xs text-emerald-400 font-mono font-medium">
                {activeTrip.weather?.temp}
              </p>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                {activeTrip.weather?.note}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Create New Trip */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Create New Trip Plan</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTrip} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-slate-500 block mb-1">
                  Trip Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Goa Beach Escape"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-500 block mb-1">
                  Destination
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. North Goa, India"
                  value={newDestination}
                  onChange={(e) => setNewDestination(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold uppercase text-slate-500 block mb-1">
                    Dates
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 5–10 Dec 2025"
                    value={newDates}
                    onChange={(e) => setNewDates(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-slate-500 block mb-1">
                    Travellers
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={newTravellers}
                    onChange={(e) => setNewTravellers(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-500 block mb-1">
                  Estimated Budget (₹)
                </label>
                <input
                  type="number"
                  step="1000"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00875a] hover:bg-[#007048] text-white rounded-full text-xs font-bold shadow-sm transition-colors"
                >
                  Create Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Itinerary Activity Stop */}
      {showAddStopModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Add Itinerary Activity</h3>
              <button
                onClick={() => setShowAddStopModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddStop} className="space-y-4">
              <div className="grid grid-cols-4 gap-2">
                <div className="col-span-1">
                  <label className="text-xs font-bold uppercase text-slate-500 block mb-1">Day</label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    required
                    value={stopDay}
                    onChange={(e) => setStopDay(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white"
                  />
                </div>
                <div className="col-span-3">
                  <label className="text-xs font-bold uppercase text-slate-500 block mb-1">Activity Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Scuba diving & reef exploration"
                    value={stopTitle}
                    onChange={(e) => setStopTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-500 block mb-1">Location / Spot</label>
                <input
                  type="text"
                  placeholder="e.g. Grand Island Beach"
                  value={stopLocation}
                  onChange={(e) => setStopLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-500 block mb-1">Details & Tips</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Meet the boat guide at 8:00 AM, pack waterproof camera."
                  value={stopDesc}
                  onChange={(e) => setStopDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddStopModal(false)}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00875a] hover:bg-[#007048] text-white rounded-full text-xs font-bold shadow-sm transition-colors"
                >
                  Add Stop
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
