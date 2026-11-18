import { useState } from "react";
import { Search, MapPin, Star } from "lucide-react";

export default function MapsView() {
  const [activePin, setActivePin] = useState("Bali");

  const places = [
    {
      name: "Bali",
      location: "Ubud, Indonesia",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Manali",
      location: "Himachal Pradesh, India",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Swiss Alps",
      location: "Interlaken, Switzerland",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Explore the map</h1>
          <p className="text-xs text-slate-500 mt-1">
            A calmer way to see where your curiosity is taking you.
          </p>
        </div>
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full text-xs font-bold">
          <button className="px-4 py-1.5 bg-[#00875a] text-white rounded-full shadow-xs">
            Map view
          </button>
          <button className="px-4 py-1.5 text-slate-600 hover:text-slate-900">
            List view
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Map Canvas Placeholder */}
        <div className="lg:col-span-8 bg-[#e8f7f0] rounded-3xl min-h-[520px] border border-emerald-200/50 relative overflow-hidden flex flex-col justify-between p-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200/70 rounded-full text-xs font-semibold text-amber-800 self-start">
            <MapPin className="w-3.5 h-3.5 text-amber-600" /> Map integration placeholder
          </div>

          {/* Interactive Simulated Pins */}
          <div className="absolute top-1/3 left-1/4">
            <button
              onClick={() => setActivePin("Bali")}
              className="w-10 h-10 rounded-full bg-[#00875a] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform border-2 border-white ring-4 ring-emerald-500/20"
            >
              <MapPin className="w-5 h-5 fill-current" />
            </button>
          </div>

          <div className="absolute top-2/5 right-1/3">
            <button
              onClick={() => setActivePin("Manali")}
              className="w-10 h-10 rounded-full bg-[#00875a] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform border-2 border-white ring-4 ring-emerald-500/20"
            >
              <MapPin className="w-5 h-5 fill-current" />
            </button>
          </div>

          <div className="absolute bottom-1/4 left-1/3">
            <button
              onClick={() => setActivePin("Swiss Alps")}
              className="w-10 h-10 rounded-full bg-[#00875a] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform border-2 border-white ring-4 ring-emerald-500/20"
            >
              <MapPin className="w-5 h-5 fill-current" />
            </button>
          </div>

          <div className="absolute bottom-1/6 right-1/4">
            <button className="w-10 h-10 rounded-full bg-[#00875a] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform border-2 border-white ring-4 ring-emerald-500/20">
              <MapPin className="w-5 h-5 fill-current" />
            </button>
          </div>

          <span className="text-xs text-emerald-800/60 font-mono">
            Interactive map canvas (Mapbox / Leaflet ready)
          </span>
        </div>

        {/* Right: Destination side cards */}
        <div className="lg:col-span-4 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search nearby places"
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-full text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00875a]/30"
            />
          </div>

          <div className="space-y-3 pt-2">
            {places.map((place) => (
              <div
                key={place.name}
                onClick={() => setActivePin(place.name)}
                className={`flex items-center gap-4 p-3 bg-white rounded-2xl border transition-all cursor-pointer ${
                  activePin === place.name
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
                  <p className="text-xs text-slate-400 mt-1">{place.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

