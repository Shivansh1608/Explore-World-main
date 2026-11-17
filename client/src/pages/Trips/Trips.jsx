import { useState, useEffect } from "react";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { Plus, Trash2, Calendar, DollarSign, MapPin, Compass } from "lucide-react";

export default function Trips() {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [budget, setBudget] = useState("");

  const fetchTrips = async () => {
    if (!user) return setLoading(false);
    try {
      const res = await API.get("/trips");
      setTrips(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, [user]);

  const handleCreateTrip = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/trips", {
        title,
        budget: budget ? Number(budget) : 0,
      });
      setTrips([res.data.data, ...trips]);
      setTitle("");
      setBudget("");
      setShowModal(false);
    } catch (err) {
      alert("Failed to create trip plan");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this trip?")) return;
    try {
      await API.delete(`/trips/${id}`);
      setTrips(trips.filter((t) => t._id !== id));
    } catch {
      alert("Failed to delete trip");
    }
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center">
        <Compass className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-slate-900">Trip Planner</h2>
        <p className="text-xs text-slate-500 mt-2 mb-6">
          Log in to design day-wise itineraries, track expenses, and manage upcoming vacations.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Your Travel Itineraries</h1>
          <p className="text-xs text-slate-500 mt-1">Organize travel timelines, track budgets, and manage itineraries.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> Create New Trip
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Plan a New Adventure</h3>
            <form onSubmit={handleCreateTrip} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Trip Name</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Summer Roadtrip in Himachal"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Budget Target (₹)</label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="e.g. 25000"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg"
                >
                  Save Trip
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-sm text-slate-400">Loading trips...</p>
      ) : trips.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No trips planned yet</h3>
          <p className="text-xs text-slate-400 mt-1">Start by creating your first travel plan above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <div key={trip._id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    {trip.visibility}
                  </span>
                  <button
                    onClick={() => handleDelete(trip._id)}
                    className="p-1 text-slate-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{trip.title}</h3>
                <p className="text-xs text-slate-500">
                  Target Budget: <span className="font-bold text-slate-800">₹{trip.budget || 0}</span>
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
                Created: {new Date(trip.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
