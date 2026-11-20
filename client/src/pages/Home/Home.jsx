import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";
import { fallbackDestinations } from "../../data/fallbackDestinations";
import { useBookmarks } from "../../context/BookmarkContext";
import {
  Search,
  Star,
  Bookmark,
  ArrowRight,
  Sparkles,
  Zap,
  Waves,
  Compass,
  Landmark,
  Palette,
  Trees,
  Globe2,
} from "lucide-react";

export default function Home() {
  const [searchDestination, setSearchDestination] = useState("");
  const [popularDestinations, setPopularDestinations] = useState(fallbackDestinations.slice(0, 6));
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const fetchPopular = async () => {
      try {
        const res = await API.get("/destinations?limit=6");
        if (res?.data?.data && res.data.data.length > 0) {
          if (isMounted) setPopularDestinations(res.data.data);
        }
      } catch (err) {
        console.warn("Home destinations fallback:", err.message);
      }
    };
    fetchPopular();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchDestination.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchDestination)}`);
    } else {
      navigate("/explore");
    }
  };

  const categories = [
    {
      name: "Mountains",
      icon: Zap,
      bg: "bg-[#e8f7f0]",
      color: "text-[#00875a]",
    },
    {
      name: "Beaches",
      icon: Waves,
      bg: "bg-[#e8f4fa]",
      color: "text-[#0070a3]",
    },
    {
      name: "Adventure",
      icon: Compass,
      bg: "bg-[#fff2e8]",
      color: "text-[#d9480f]",
    },
    {
      name: "Historical",
      icon: Landmark,
      bg: "bg-[#fff8e6]",
      color: "text-[#b25e00]",
    },
    {
      name: "Culture",
      icon: Palette,
      bg: "bg-[#f3edff]",
      color: "text-[#6741d9]",
    },
    {
      name: "Wildlife",
      icon: Trees,
      bg: "bg-[#f2f9e8]",
      color: "text-[#5c940d]",
    },
  ];

  const stories = [
    {
      author: "Maya Kapoor",
      avatarInitials: "MK",
      location: "Kyoto, Japan • 2h ago",
      image:
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
      caption:
        "The quietest morning at Arashiyama. Arrive before 7 and the bamboo grove feels like it belongs only to you.",
    },
    {
      author: "Arjun Mehta",
      avatarInitials: "AM",
      location: "Manali, India • Yesterday",
      image:
        "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
      caption:
        "Woke up above the cloudline at Solang. Crisp Himalayan air, steaming chai, and unbroken silence.",
    },
    {
      author: "Sofia Laurent",
      avatarInitials: "SL",
      location: "Amalfi Coast, Italy • 3 days ago",
      image:
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
      caption:
        "Cliffside walks from Positano to Praiano. The coast never stops astonishing with its pastel tones.",
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[640px] flex items-center justify-center overflow-hidden">
        {/* Dark tinted high-res background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85')`,
          }}
        >
          <div className="absolute inset-0 bg-slate-950/45 backdrop-brightness-90" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-emerald-200 mb-8">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Make room for wonder</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] max-w-4xl mx-auto text-white">
            Discover the world, one journey at a time.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed">
            Find extraordinary destinations, share your adventures, and explore together with a community that travels thoughtfully.
          </p>

          {/* Large Hero Search Bar */}
          <form
            onSubmit={handleSearch}
            className="mt-10 max-w-2xl mx-auto bg-white rounded-full p-2 pl-6 shadow-2xl flex items-center gap-3 border border-white/40"
          >
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchDestination}
              onChange={(e) => setSearchDestination(e.target.value)}
              placeholder="Where would you like to go?"
              className="flex-1 bg-transparent text-slate-900 placeholder-slate-400 text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#00875a] hover:bg-[#007048] text-white text-sm font-semibold rounded-full flex items-center gap-2 transition-colors shadow-sm"
            >
              Explore now <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick search tags */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-300">
            <span className="text-slate-400">Try searching</span>
            {["Bali", "Mountain escapes", "Slow travel"].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSearchDestination(tag);
                  navigate(`/explore?search=${encodeURIComponent(tag)}`);
                }}
                className="px-3.5 py-1 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/15 text-slate-200 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. POPULAR DESTINATIONS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#00875a]">
              Curated for you
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
              Popular destinations
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Places with a little extra magic, selected by travellers who like to take the scenic route.
            </p>
          </div>
          <Link
            to="/explore"
            className="text-xs font-bold text-[#00875a] hover:text-[#007048] flex items-center gap-1 group self-start sm:self-auto"
          >
            View all <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularDestinations.map((dest) => {
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
      </section>

      {/* 3. EXPLORE BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-xs uppercase font-extrabold tracking-wider text-[#00875a]">
            Find your feeling
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
            Explore by category
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.name}
                onClick={() => navigate(`/explore?category=${cat.name}`)}
                className={`${cat.bg} p-6 rounded-3xl text-left hover:scale-[1.02] transition-transform flex flex-col justify-between min-h-[140px]`}
              >
                <Icon className={`w-5 h-5 ${cat.color}`} />
                <div>
                  <span className={`text-sm font-black block ${cat.color}`}>
                    {cat.name}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">⌟</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. STORIES WORTH FOLLOWING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#00875a]">
              From the community
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
              Stories worth following
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              A little inspiration from people out there collecting moments, not things.
            </p>
          </div>
          <Link
            to="/community"
            className="text-xs font-bold text-[#00875a] hover:text-[#007048] flex items-center gap-1 group self-start sm:self-auto"
          >
            Visit community <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.map((story, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              <div className="p-4 flex items-center justify-between border-b border-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#d3f9d8] text-[#087f5b] font-bold text-xs flex items-center justify-center border border-[#b2f2bb]">
                    {story.avatarInitials}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{story.author}</h4>
                    <p className="text-[11px] text-slate-400">{story.location}</p>
                  </div>
                </div>
                <span className="text-slate-300 font-bold tracking-widest text-xs">...</span>
              </div>

              <div className="w-full h-64 overflow-hidden bg-slate-100">
                <img
                  src={story.image}
                  alt={story.author}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5 flex-1">
                <p className="text-xs text-slate-600 leading-relaxed">
                  {story.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. NEWSLETTER / CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-[#00875a] p-8 sm:p-14 overflow-hidden text-white flex flex-col justify-between min-h-[260px]">
          {/* Subtle concentric circles in corner */}
          <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full border-[30px] border-white/10 pointer-events-none" />

          <div>
            <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white mb-4">
              <Globe2 className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight max-w-xl">
              A better way to keep your world open.
            </h2>
            <p className="mt-2 text-emerald-100 text-xs sm:text-sm max-w-lg">
              Monthly notes on places to go, people to meet, and how to travel with more curiosity.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 max-w-md">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-5 py-3 rounded-full bg-white/15 placeholder-emerald-200/80 text-white text-xs border border-white/20 focus:outline-none focus:bg-white/25"
            />
            <button className="w-full sm:w-auto px-6 py-3 bg-[#fab005] hover:bg-[#f59f00] text-slate-950 font-bold text-xs rounded-full whitespace-nowrap shadow-sm transition-colors">
              Join the journal
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
