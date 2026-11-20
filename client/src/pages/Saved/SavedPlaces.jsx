import { useState } from "react";
import { Link } from "react-router-dom";
import { useBookmarks } from "../../context/BookmarkContext";
import { Bookmark, Star, ArrowRight, Trash2, MapPin, Compass } from "lucide-react";

export default function SavedPlaces() {
  const { bookmarks, toggleBookmark, clearBookmarks } = useBookmarks();
  const [filterCategory, setFilterCategory] = useState("All");

  const categories = ["All", ...new Set(bookmarks.flatMap((b) => {
    if (Array.isArray(b.category)) return b.category;
    if (typeof b.category === "string") return [b.category];
    return [];
  }))];

  const filtered = bookmarks.filter((item) => {
    if (filterCategory === "All") return true;
    const cats = Array.isArray(item.category) ? item.category : [item.category];
    return cats.some((c) => c && c.toLowerCase().includes(filterCategory.toLowerCase()));
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 bg-emerald-50 text-emerald-700 rounded-lg">
              <Bookmark className="w-4 h-4 fill-emerald-600" />
            </span>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Your Personal Wishlist
            </span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Saved Destinations</h1>
          <p className="text-xs text-slate-500 mt-1">
            Curate and organize the places you dream of exploring.
          </p>
        </div>

        {bookmarks.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={clearBookmarks}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 px-3 py-2 rounded-xl hover:bg-rose-50 transition-colors"
            >
              Clear All
            </button>
            <Link
              to="/explore"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#00875a] hover:bg-[#007048] text-white text-xs font-bold rounded-full shadow-sm transition-colors"
            >
              <Compass className="w-3.5 h-3.5" /> Discover More
            </Link>
          </div>
        )}
      </div>

      {bookmarks.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <Bookmark className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">No saved places yet</h3>
          <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
            When you discover a destination you love on the Explore or Home page, click the bookmark icon to save it here for easy planning!
          </p>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#00875a] hover:bg-[#007048] text-white text-xs font-bold rounded-full shadow-sm transition-colors"
          >
            Explore Destinations <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <>
          {/* Categories bar */}
          {categories.length > 2 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    filterCategory === cat
                      ? "bg-[#00875a] text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((dest) => {
              const destId = dest._id || dest.id;
              const displayCategory = Array.isArray(dest.category)
                ? dest.category[0] || "Travel"
                : dest.category || "Travel";
              const displayLocation = dest.city
                ? `${dest.city}, ${dest.country}`
                : dest.location || dest.country || "";

              return (
                <div
                  key={destId}
                  className="group bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
                >
                  <div className="relative w-full h-56 overflow-hidden">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-slate-800 shadow-sm">
                      {displayCategory}
                    </span>
                    <button
                      onClick={() => toggleBookmark(dest)}
                      title="Remove from saved"
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-amber-500 hover:bg-rose-50 hover:text-rose-600 shadow-sm transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
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
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" /> {displayLocation}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[11px] text-slate-400 block font-medium">from</span>
                        <span className="text-sm font-black text-slate-900">{dest.price}</span>
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
        </>
      )}
    </div>
  );
}
