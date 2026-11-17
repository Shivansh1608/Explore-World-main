import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import { Search, MapPin, Tag, Compass, Sparkles, SlidersHorizontal, ArrowRight } from "lucide-react";

const CATEGORIES = ["All", "Mountains", "Beaches", "Historical", "Adventure", "Religious", "Wildlife", "Other"];

export default function Explore() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (selectedCategory !== "All") params.category = selectedCategory;

      const res = await API.get("/destinations", { params });
      setDestinations(res.data.data || []);
    } catch (err) {
      console.error("Failed to load destinations", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDestinations();
    }, 300);
    return () => clearTimeout(timer);
  }, [search, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Global Atlas
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-2 tracking-tight sm:text-4xl">
            Explore Destinations
          </h1>
          <p className="text-slate-500 mt-1 text-sm max-w-xl">
            Browse through community-curated travel destinations with genuine insights, estimated budgets, and itineraries.
          </p>
        </div>

        <Link
          to="/destinations/new"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors self-start md:self-auto"
        >
          Add New Destination
        </Link>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by city, country, destination name, or tags..."
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white font-semibold"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-4 animate-pulse">
              <div className="w-full h-48 bg-slate-200 rounded-xl mb-4" />
              <div className="h-5 bg-slate-200 rounded w-2/3 mb-2" />
              <div className="h-4 bg-slate-100 rounded w-1/3 mb-4" />
              <div className="h-4 bg-slate-100 rounded w-full mb-2" />
            </div>
          ))}
        </div>
      ) : destinations.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300">
          <Compass className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No destinations found</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search criteria or be the first to publish a new destination!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <Link
              key={dest._id}
              to={`/destinations/${dest._id}`}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative w-full h-52 bg-slate-100 overflow-hidden">
                <img
                  src={
                    dest.images?.[0]?.url ||
                    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80"
                  }
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-slate-800 shadow-sm flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  {dest.city ? `${dest.city}, ${dest.country}` : dest.country}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {dest.category?.slice(0, 2).map((c) => (
                      <span key={c} className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {c}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
                    {dest.name}
                  </h3>

                  <p className="mt-2 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {dest.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block uppercase font-medium">Est. Budget</span>
                    <span className="text-sm font-bold text-slate-800">
                      {dest.estimatedBudget ? `₹${dest.estimatedBudget.toLocaleString()}` : "Moderate"}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
