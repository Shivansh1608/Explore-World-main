import { useState } from "react";
import { Link } from "react-router-dom";
import { fallbackDestinations } from "../../data/fallbackDestinations";
import { useBookmarks } from "../../context/BookmarkContext";
import {
  Search,
  MapPin,
  Star,
  Compass,
  ArrowRight,
  Layers,
  ZoomIn,
  ZoomOut,
  Bookmark,
  ExternalLink,
} from "lucide-react";

export default function MapsView() {
  // Coordinates mapped to percentage (x, y) on a world projection canvas
  const mapPlaces = [
    {
      id: "paris",
      name: "Paris",
      country: "France",
      city: "Paris",
      category: "Historical",
      x: 48,
      y: 32,
      price: "₹92,000",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "swiss-alps",
      name: "Swiss Alps",
      country: "Switzerland",
      city: "Interlaken",
      category: "Adventure",
      x: 51,
      y: 35,
      price: "₹1,48,000",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "amalfi",
      name: "Amalfi Coast",
      country: "Italy",
      city: "Positano",
      category: "Beaches",
      x: 52,
      y: 39,
      price: "₹45,000",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "manali",
      name: "Manali",
      country: "India",
      city: "Himachal Pradesh",
      category: "Mountains",
      x: 69,
      y: 44,
      price: "₹18,500",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "maldives",
      name: "Maldives",
      country: "Maldives",
      city: "North Malé",
      category: "Beaches",
      x: 68,
      y: 60,
      price: "₹78,000",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "bali",
      name: "Bali",
      country: "Indonesia",
      city: "Ubud",
      category: "Beaches",
      x: 82,
      y: 68,
      price: "₹42,000",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "kyoto",
      name: "Kyoto",
      country: "Japan",
      city: "Kansai",
      category: "Culture",
      x: 85,
      y: 41,
      price: "₹60,000",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "tokyo",
      name: "Tokyo",
      country: "Japan",
      city: "Kantō",
      category: "Culture",
      x: 87,
      y: 40,
      price: "₹84,000",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80",
    },
  ];

  const [activePlaceId, setActivePlaceId] = useState("bali");
  const [viewMode, setViewMode] = useState("map"); // "map" or "list"
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [zoomLevel, setZoomLevel] = useState(1);
  const { toggleBookmark, isBookmarked } = useBookmarks();

  const categories = ["All", "Mountains", "Beaches", "Adventure", "Historical", "Culture"];

  const filteredPlaces = mapPlaces.filter((p) => {
    const matchCat = selectedCategory === "All" || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.country.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const activePlace = mapPlaces.find((p) => p.id === activePlaceId) || filteredPlaces[0] || mapPlaces[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Interactive Global Map</h1>
          <p className="text-xs text-slate-500 mt-1">
            Visual coordinates, regional hubs, and destination exploration.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full text-xs font-bold self-start sm:self-auto">
          <button
            onClick={() => setViewMode("map")}
            className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
              viewMode === "map" ? "bg-[#00875a] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Map View
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
              viewMode === "list" ? "bg-[#00875a] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            List View
          </button>
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
              selectedCategory === cat
                ? "bg-[#00875a] text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {viewMode === "map" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive World Map Canvas */}
          <div className="lg:col-span-8 bg-[#0f172a] rounded-3xl min-h-[520px] border border-slate-800 relative overflow-hidden flex flex-col justify-between p-6 shadow-xl select-none">
            {/* Top Toolbar overlay */}
            <div className="flex items-center justify-between z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800/90 border border-slate-700/80 rounded-full text-xs font-semibold text-emerald-400 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Live Exploration Mode ({filteredPlaces.length} Destinations Visible)
              </div>

              {/* Map Zoom Controls */}
              <div className="flex items-center gap-1 bg-slate-800/90 border border-slate-700/80 rounded-full p-1 backdrop-blur-md">
                <button
                  onClick={() => setZoomLevel((z) => Math.min(z + 0.15, 1.45))}
                  title="Zoom In"
                  className="p-1.5 text-slate-300 hover:text-white rounded-full hover:bg-slate-700 transition-colors"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel((z) => Math.max(z - 0.15, 0.85))}
                  title="Zoom Out"
                  className="p-1.5 text-slate-300 hover:text-white rounded-full hover:bg-slate-700 transition-colors"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Stylized SVG World Map Grid Background */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out pointer-events-none"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <svg
                viewBox="0 0 1000 500"
                className="w-full h-full opacity-35 text-slate-700 fill-current"
              >
                {/* Lat/Long Grid lines */}
                <line x1="0" y1="125" x2="1000" y2="125" stroke="#1e293b" strokeDasharray="4 4" />
                <line x1="0" y1="250" x2="1000" y2="250" stroke="#334155" strokeWidth="1.5" />
                <line x1="0" y1="375" x2="1000" y2="375" stroke="#1e293b" strokeDasharray="4 4" />
                <line x1="250" y1="0" x2="250" y2="500" stroke="#1e293b" strokeDasharray="4 4" />
                <line x1="500" y1="0" x2="500" y2="500" stroke="#334155" strokeWidth="1.5" />
                <line x1="750" y1="0" x2="750" y2="500" stroke="#1e293b" strokeDasharray="4 4" />

                {/* Continental outlines (stylized vector shapes) */}
                {/* North & South America */}
                <path d="M 120 70 Q 200 60 220 120 T 190 220 Q 240 270 210 380 T 170 450 Q 150 400 130 300 Z" />
                {/* Europe */}
                <path d="M 460 70 Q 540 60 550 140 T 470 190 Q 440 140 460 70 Z" />
                {/* Africa */}
                <path d="M 460 190 Q 560 200 540 330 T 490 420 Q 430 310 460 190 Z" />
                {/* Asia */}
                <path d="M 560 60 Q 820 40 850 170 T 730 290 Q 600 230 560 60 Z" />
                {/* Australia */}
                <path d="M 760 330 Q 880 320 860 410 T 780 430 Z" />
              </svg>
            </div>

            {/* Interactive Pins on Map */}
            <div
              className="absolute inset-0 transition-transform duration-500 ease-out"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {filteredPlaces.map((place) => {
                const isSelected = activePlace?.id === place.id;
                return (
                  <div
                    key={place.id}
                    style={{ left: `${place.x}%`, top: `${place.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                  >
                    <button
                      onClick={() => setActivePlaceId(place.id)}
                      className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                        isSelected
                          ? "bg-emerald-400 text-slate-900 scale-125 ring-4 ring-emerald-400/40 shadow-xl"
                          : "bg-slate-800 text-emerald-400 border border-emerald-500/50 hover:scale-110 hover:bg-emerald-500 hover:text-white"
                      }`}
                    >
                      <MapPin className="w-4 h-4 fill-current" />
                      {isSelected && (
                        <span className="absolute -inset-1 rounded-full border border-emerald-400 animate-ping opacity-60" />
                      )}
                    </button>

                    {/* Hover tooltip label */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900/95 text-white px-2.5 py-1 rounded-lg text-[11px] font-bold shadow-lg border border-slate-700 whitespace-nowrap z-30 pointer-events-none">
                      {place.name}, {place.country}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom-left Selected Pin Info Overlay */}
            {activePlace && (
              <div className="z-10 bg-slate-900/95 border border-slate-700/80 rounded-2xl p-4 backdrop-blur-md max-w-sm self-start flex items-center gap-4 shadow-2xl animate-in fade-in slide-in-from-bottom-2">
                <img
                  src={activePlace.image}
                  alt={activePlace.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">{activePlace.name}</h4>
                    <span className="text-xs font-bold text-emerald-400">{activePlace.price}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">{activePlace.city}, {activePlace.country}</p>
                  <Link
                    to={`/destinations/${activePlace.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:underline pt-0.5"
                  >
                    View Destination Details <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Right: Destination side cards list */}
          <div className="lg:col-span-4 space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search coordinates by name or country..."
                className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200/90 rounded-full text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#00875a]/30 focus:border-[#00875a]"
              />
            </div>

            <div className="space-y-3 pt-1 max-h-[460px] overflow-y-auto pr-1">
              {filteredPlaces.map((place) => (
                <div
                  key={place.id}
                  onClick={() => setActivePlaceId(place.id)}
                  className={`flex items-center gap-4 p-3 bg-white rounded-2xl border transition-all cursor-pointer ${
                    activePlace?.id === place.id
                      ? "border-[#00875a] ring-2 ring-[#00875a]/20 shadow-sm"
                      : "border-slate-200/80 hover:border-slate-300"
                  }`}
                >
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900">{place.name}</h4>
                      <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{place.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{place.city}, {place.country}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs font-black text-slate-900">{place.price}</span>
                      <Link
                        to={`/destinations/${place.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs font-bold text-[#00875a] hover:underline"
                      >
                        Details &gt;
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* List View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((place) => (
            <div
              key={place.id}
              className="group bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative w-full h-52 overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-slate-800 shadow-sm">
                  {place.category}
                </span>
                <button
                  onClick={() => toggleBookmark(place)}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-600 hover:text-slate-900 shadow-sm transition-colors"
                >
                  <Bookmark
                    className={`w-4 h-4 ${isBookmarked(place.id) ? "fill-amber-500 text-amber-500" : ""}`}
                  />
                </button>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">{place.name}</h3>
                    <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{place.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{place.city}, {place.country}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">from</span>
                    <span className="text-sm font-black text-slate-900">{place.price}</span>
                  </div>
                  <Link
                    to={`/destinations/${place.id}`}
                    className="text-xs font-bold text-[#00875a] flex items-center gap-1 hover:underline"
                  >
                    View details &gt;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
