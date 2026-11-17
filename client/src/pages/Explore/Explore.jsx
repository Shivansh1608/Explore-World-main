import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal, ChevronDown, Bookmark, Star, Plus } from "lucide-react";

export default function Explore() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const categories = ["Mountains", "Beaches", "Adventure", "Historical", "Culture", "Wildlife"];

  const places = [
    {
      id: "paris",
      name: "Paris",
      location: "Île-de-France, France",
      category: "Historical",
      rating: 4.7,
      price: "₹92,000",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "bali",
      name: "Bali",
      location: "Ubud, Indonesia",
      category: "Beach",
      rating: 4.9,
      price: "₹42,000",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "tokyo",
      name: "Tokyo",
      location: "Kantō, Japan",
      category: "Culture",
      rating: 4.8,
      price: "₹84,000",
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "manali",
      name: "Manali",
      location: "Himachal Pradesh, India",
      category: "Mountains",
      rating: 4.8,
      price: "₹18,500",
      image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "maldives",
      name: "Maldives",
      location: "North Malé Atoll, Maldives",
      category: "Beach",
      rating: 4.9,
      price: "₹78,000",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "swiss-alps",
      name: "Swiss Alps",
      location: "Interlaken, Switzerland",
      category: "Adventure",
      rating: 4.9,
      price: "₹1,48,000",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const filteredPlaces = places.filter((p) => {
    const matchCategory =
      selectedCategory === "All" ||
      p.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
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
              onChange={(e) => setSearch(e.target.value)}
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
            onClick={() => setSelectedCategory("All")}
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
              onClick={() => setSelectedCategory(cat)}
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
        <span className="font-semibold text-slate-700">{filteredPlaces.length} places found</span>
        <button
          onClick={() => {
            setSelectedCategory("All");
            setSearch("");
          }}
          className="text-slate-500 hover:text-slate-800 font-medium"
        >
          Clear filters
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlaces.map((dest) => (
          <div
            key={dest.id}
            className="group bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
          >
            <div className="relative w-full h-56 overflow-hidden">
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-slate-800 shadow-sm">
                {dest.category}
              </span>
              <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-600 hover:text-slate-900 shadow-sm transition-colors">
                <Bookmark className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">{dest.name}</h3>
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{dest.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-1">{dest.location}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">from</span>
                  <span className="text-sm font-black text-slate-900">{dest.price}</span>
                </div>
                <Link
                  to={`/destinations/${dest.id}`}
                  className="text-xs font-bold text-[#00875a] flex items-center gap-1 hover:underline"
                >
                  View details &gt;
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
