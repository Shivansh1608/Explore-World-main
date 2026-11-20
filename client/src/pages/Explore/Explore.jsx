import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import API from "../../services/api";
import { fallbackDestinations } from "../../data/fallbackDestinations";
import { useBookmarks } from "../../context/BookmarkContext";
import { Search, SlidersHorizontal, ChevronDown, Bookmark, Star, Plus, Loader2 } from "lucide-react";

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialSearch = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [search, setSearch] = useState(initialSearch);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toggleBookmark, isBookmarked } = useBookmarks();

  const categories = ["Mountains", "Beaches", "Adventure", "Historical", "Culture", "Wildlife"];

  useEffect(() => {
    const qCategory = searchParams.get("category");
    const qSearch = searchParams.get("search");
    if (qCategory) setSelectedCategory(qCategory);
    if (qSearch) setSearch(qSearch);
  }, [searchParams]);

  useEffect(() => {
    let isMounted = true;
    const fetchDestinations = async () => {
      setLoading(true);
      try {
        const res = await API.get("/destinations?limit=30");
        if (res?.data?.data && res.data.data.length > 0) {
          if (isMounted) setDestinations(res.data.data);
        } else {
          if (isMounted) setDestinations(fallbackDestinations);
        }
      } catch (err) {
        console.warn("Using fallback destinations catalog:", err.message);
        if (isMounted) setDestinations(fallbackDestinations);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDestinations();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    const newParams = new URLSearchParams(searchParams);
    if (cat === "All") {
      newParams.delete("category");
    } else {
      newParams.set("category", cat);
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (val) => {
    setSearch(val);
    const newParams = new URLSearchParams(searchParams);
    if (val.trim()) {
      newParams.set("search", val);
    } else {
      newParams.delete("search");
    }
    setSearchParams(newParams);
  };

  const placesToFilter = destinations.length > 0 ? destinations : fallbackDestinations;

  const filteredPlaces = placesToFilter.filter((p) => {
    const pCats = Array.isArray(p.category) ? p.category : [p.category || ""];
    const matchCategory =
      selectedCategory === "All" ||
      pCats.some((c) => c && c.toLowerCase().includes(selectedCategory.toLowerCase()));

    const locationStr = `${p.city || ""} ${p.state || ""} ${p.country || ""} ${p.location || ""}`.toLowerCase();
    const nameStr = (p.name || "").toLowerCase();
    const q = search.toLowerCase();

    const matchSearch = !search || nameStr.includes(q) || locationStr.includes(q);
    return matchCategory && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Explore destinations
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            A considered collection of places that make leaving home worth it.
          </p>
        </div>
        <Link
          to="/destinations/new"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#00875a] hover:bg-[#007048] text-white text-xs font-bold rounded-full shadow-sm transition-colors self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 stroke-[3]" /> Suggest a place
        </Link>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by place, country or feeling..."
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200/70 rounded-full text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00875a]/30 focus:border-[#00875a]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-full text-xs font-semibold text-slate-700 hover:bg-slate-100">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
            </button>
            <div className="relative">
              <button className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-full text-xs font-semibold text-slate-700 hover:bg-slate-100">
                Most popular <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Category rounded pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1">
          <button
            onClick={() => handleCategorySelect("All")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              selectedCategory === "All"
                ? "bg-[#00875a] text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-[#00875a] text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span className="font-semibold text-slate-700">
          {loading ? "Loading places..." : `${filteredPlaces.length} places found`}
        </span>
        <button
          onClick={() => {
            handleCategorySelect("All");
            handleSearchChange("");
          }}
          className="text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
        >
          Clear filters
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlaces.map((dest) => {
          const destId = dest._id || dest.id;
          const displayImage =
            dest.images?.[0]?.url ||
            dest.image ||
            "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80";
          const displayCategory = Array.isArray(dest.category)
            ? dest.category[0] || "Explore"
            : dest.category || "Explore";
          const displayLocation = dest.city
            ? `${dest.city}, ${dest.country}`
            : dest.location || dest.country || "";
          const displayPrice = dest.estimatedBudget
            ? `₹${dest.estimatedBudget.toLocaleString()}`
            : dest.price || "₹25,000";

          return (
            <div
              key={destId}
              className="group bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative w-full h-56 overflow-hidden">
                <img
                  src={displayImage}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-slate-800 shadow-sm">
                  {displayCategory}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleBookmark(dest);
                  }}
                  title={isBookmarked(destId) ? "Remove from wishlist" : "Save to wishlist"}
                  className={`absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center shadow-sm transition-all ${
                    isBookmarked(destId)
                      ? "bg-white text-amber-500 scale-105"
                      : "bg-white/90 text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked(destId) ? "fill-amber-500" : ""}`} />
                </button>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">{dest.name}</h3>
                    <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{dest.rating || 4.8}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{displayLocation}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">from</span>
                    <span className="text-sm font-black text-slate-900">{displayPrice}</span>
                  </div>
                  <Link
                    to={`/destinations/${destId}`}
                    className="text-xs font-bold text-[#00875a] flex items-center gap-1 hover:underline"
                  >
                    View details &gt;
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
