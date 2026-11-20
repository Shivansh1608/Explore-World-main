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
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Calendar,
  Users,
  Award,
  ChevronDown,
  ChevronUp,
  Quote,
  Plane,
  Camera,
  Bot,
  Luggage,
} from "lucide-react";

export default function Home() {
  const [searchDestination, setSearchDestination] = useState("");
  const [popularDestinations, setPopularDestinations] = useState(fallbackDestinations.slice(0, 6));
  const [activeCollection, setActiveCollection] = useState("all");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const { toggleBookmark, isBookmarked } = useBookmarks();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const fetchPopular = async () => {
      try {
        const res = await API.get("/destinations?limit=12");
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

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubmitted(true);
    setNewsletterEmail("");
  };

  const categories = [
    { name: "Mountains", icon: Zap, bg: "bg-[#e8f7f0]", color: "text-[#00875a]" },
    { name: "Beaches", icon: Waves, bg: "bg-[#e8f4fa]", color: "text-[#0070a3]" },
    { name: "Adventure", icon: Compass, bg: "bg-[#fff2e8]", color: "text-[#d9480f]" },
    { name: "Historical", icon: Landmark, bg: "bg-[#fff8e6]", color: "text-[#b25e00]" },
    { name: "Culture", icon: Palette, bg: "bg-[#f3edff]", color: "text-[#6741d9]" },
    { name: "Wildlife", icon: Trees, bg: "bg-[#f2f9e8]", color: "text-[#5c940d]" },
  ];

  // Thematic collections
  const collections = {
    all: fallbackDestinations.slice(0, 8),
    mountains: fallbackDestinations.filter((d) => d.category?.includes("Mountains")),
    beaches: fallbackDestinations.filter((d) => d.category?.includes("Beaches")),
    heritage: fallbackDestinations.filter((d) => d.category?.includes("Historical") || d.category?.includes("Culture")),
  };

  const displayedPlaces = collections[activeCollection] || collections.all;

  const stories = [
    {
      author: "Maya Kapoor",
      avatarInitials: "MK",
      location: "Kyoto, Japan • 2h ago",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
      caption: "The quietest morning at Arashiyama. Arrive before 7 and the bamboo grove feels like it belongs only to you.",
    },
    {
      author: "Arjun Mehta",
      avatarInitials: "AM",
      location: "Manali, India • Yesterday",
      image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
      caption: "Woke up above the cloudline at Solang. Crisp Himalayan air, steaming chai, and unbroken silence.",
    },
    {
      author: "Sofia Laurent",
      avatarInitials: "SL",
      location: "Amalfi Coast, Italy • 3 days ago",
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
      caption: "Cliffside walks from Positano to Praiano. The coast never stops astonishing with its pastel tones.",
    },
  ];

  const testimonials = [
    {
      quote: "ExploreWorld changed how our family travels. The budget estimations were spot-on for our Swiss Alps trip, and the offline wishlist made planning effortless.",
      author: "Sophie Martin",
      location: "Paris, France",
      trip: "Swiss Alps & Interlaken",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Sophie",
      rating: 5,
    },
    {
      quote: "The day-by-day itinerary planner is the cleanest tool I've used. Checked off all our stops in Manali, from Jogini waterfall to Solang Valley paragliding.",
      author: "Vikram Sen",
      location: "Bengaluru, India",
      trip: "Manali Expedition",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Vikram",
      rating: 5,
    },
    {
      quote: "We found hidden temples in Bali that weren't listed in generic guidebooks, thanks to the community stories and direct AI companion recommendations.",
      author: "Elena Rostova",
      location: "Berlin, Germany",
      trip: "Bali & Ubud Retreat",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Elena",
      rating: 5,
    },
  ];

  const faqs = [
    {
      q: "How does ExploreWorld help me plan trips?",
      a: "ExploreWorld combines verified destination guides, estimated transparent budgets, community photo stories, and an interactive Trip Planner with day-by-day checklists and expense breakdowns.",
    },
    {
      q: "Can I customize the trip budget and daily activities?",
      a: "Yes! In the Trip Planner, you can create new trips, add daily activity stops, adjust budgets, track completed activities, and monitor your spend distribution across Stay, Food, Transport, and Activities.",
    },
    {
      q: "How does the wishlist bookmarking feature work?",
      a: "Click the bookmark icon on any destination card to save it instantly to your personal wishlist. You can access all your saved places anytime from the top navigation or under /saved.",
    },
    {
      q: "Is ExploreWorld free for travelers?",
      a: "Yes, ExploreWorld is completely free to browse, plan trips, bookmark destinations, and share travel stories with the community.",
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[660px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85')`,
          }}
        >
          <div className="absolute inset-0 bg-slate-950/50 backdrop-brightness-90" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-emerald-200 mb-8 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Discover 18+ Iconic Global Destinations</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] max-w-4xl mx-auto text-white">
            Discover the world, one journey at a time.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed">
            Find extraordinary destinations, plan smart itineraries, and explore together with a global community that travels thoughtfully.
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
              placeholder="Search by destination, country, or feeling..."
              className="flex-1 bg-transparent text-slate-900 placeholder-slate-400 text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#00875a] hover:bg-[#007048] text-white text-sm font-semibold rounded-full flex items-center gap-2 transition-colors shadow-sm cursor-pointer"
            >
              Explore now <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick search tags */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-300">
            <span className="text-slate-400">Popular:</span>
            {["Santorini", "Manali", "Bali", "Swiss Alps", "Kyoto", "Dubai"].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSearchDestination(tag);
                  navigate(`/explore?search=${encodeURIComponent(tag)}`);
                }}
                className="px-3.5 py-1 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/15 text-slate-200 transition-colors cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. STATS & TRUST VALUE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/90 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          <div className="space-y-1">
            <span className="text-3xl font-black text-[#00875a] block">18+</span>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">Famous Places</h4>
            <p className="text-[11px] text-slate-400">Curated across 14 countries</p>
          </div>
          <div className="space-y-1 pt-4 lg:pt-0">
            <span className="text-3xl font-black text-[#00875a] block">12.5k+</span>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">Active Explorers</h4>
            <p className="text-[11px] text-slate-400">Sharing authentic journeys</p>
          </div>
          <div className="space-y-1 pt-4 lg:pt-0">
            <span className="text-3xl font-black text-[#00875a] block">4.9 ★</span>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">Average Rating</h4>
            <p className="text-[11px] text-slate-400">From verified traveler reviews</p>
          </div>
          <div className="space-y-1 pt-4 lg:pt-0">
            <span className="text-3xl font-black text-[#00875a] block">100%</span>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">Transparent Pricing</h4>
            <p className="text-[11px] text-slate-400">Clear budget estimations</p>
          </div>
        </div>
      </section>

      {/* 3. POPULAR DESTINATIONS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#00875a]">
              Curated for you
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
              Featured destinations
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Iconic places with extraordinary stories, selected by travellers who take the scenic route.
            </p>
          </div>
          <Link
            to="/explore"
            className="text-xs font-bold text-[#00875a] hover:text-[#007048] flex items-center gap-1 group self-start sm:self-auto"
          >
            View all 18 destinations <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularDestinations.slice(0, 6).map((dest) => {
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
                    className={`absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center shadow-sm transition-all cursor-pointer ${
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

      {/* 4. DESTINATION OF THE WEEK: SPOTLIGHT SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl text-white grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 p-8 sm:p-14 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Spotlight Destination
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Santorini & Oia Caldera
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
              Perched 300 meters above the Aegean Sea, the cliffside villages of Santorini offer one of the most mesmerizing landscapes on earth. Cobalt-blue domes, sun-bleached cubiform buildings, and sunsets that turn the volcanic caldera into liquid gold.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-2 border-t border-slate-800">
              <div>
                <span className="text-[11px] text-slate-400 uppercase font-bold block">Est. Budget</span>
                <span className="text-base font-black text-emerald-400">₹85,000</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 uppercase font-bold block">Best Window</span>
                <span className="text-base font-black text-slate-200">May – Oct</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 uppercase font-bold block">Rating</span>
                <span className="text-base font-black text-amber-400">4.9 ★</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/destinations/santorini"
                className="px-6 py-3 bg-[#00875a] hover:bg-[#007048] text-white text-xs font-bold rounded-full transition-colors flex items-center gap-2 shadow-sm"
              >
                Explore Santorini Guide <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/trips"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-full transition-colors border border-white/20"
              >
                Plan In Itinerary
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 h-80 lg:h-full min-h-[400px] relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80"
              alt="Santorini Oia"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* 5. EXPLORE BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-xs uppercase font-extrabold tracking-wider text-[#00875a]">
            Find your feeling
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
            Explore by travel style
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.name}
                onClick={() => navigate(`/explore?category=${cat.name}`)}
                className={`${cat.bg} p-6 rounded-3xl text-left hover:scale-[1.02] transition-transform flex flex-col justify-between min-h-[140px] cursor-pointer`}
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

      {/* 6. HOW EXPLOREWORLD WORKS (3-STEP EXPERIENCE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase font-extrabold tracking-wider text-[#00875a]">
            Effortless Journey
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            How ExploreWorld works
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            From discovering hidden gems to managing daily itineraries and tracking budgets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-4 relative">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#00875a] flex items-center justify-center font-black text-lg">
              01
            </div>
            <h3 className="text-lg font-bold text-slate-900">Discover & Wishlist</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Explore 18+ famous locations, filter by budget and category, and click the bookmark icon to save favorites directly to your personal wishlist.
            </p>
            <Link to="/explore" className="text-xs font-bold text-[#00875a] flex items-center gap-1 hover:underline pt-2">
              Browse places &gt;
            </Link>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-4 relative">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#00875a] flex items-center justify-center font-black text-lg">
              02
            </div>
            <h3 className="text-lg font-bold text-slate-900">Plan Daily Stops & Budgets</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Use our interactive Trip Planner to map day-by-day activities, check off completed stops, and track real-time allocations for stay, food, and fun.
            </p>
            <Link to="/trips" className="text-xs font-bold text-[#00875a] flex items-center gap-1 hover:underline pt-2">
              Open Trip Planner &gt;
            </Link>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-4 relative">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#00875a] flex items-center justify-center font-black text-lg">
              03
            </div>
            <h3 className="text-lg font-bold text-slate-900">Ask AI & Share Stories</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Consult our AI companion for custom packing tips and budget plans, and share your photos and stories with thousands of global adventurers.
            </p>
            <Link to="/ai-assistant" className="text-xs font-bold text-[#00875a] flex items-center gap-1 hover:underline pt-2">
              Talk to AI &gt;
            </Link>
          </div>
        </div>
      </section>

      {/* 7. INTERACTIVE MAP TEASER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] rounded-3xl p-8 sm:p-14 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-bold">
              <MapPin className="w-3.5 h-3.5" /> Interactive Geolocation Canvas
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Explore coordinates across every continent.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Switch to our interactive global map to explore live radar beacons, view place distances, and preview regional highlights in real-time.
            </p>
            <Link
              to="/maps"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#00875a] hover:bg-[#007048] text-white text-xs font-bold rounded-full transition-colors shadow-sm cursor-pointer"
            >
              Open Global Map <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Map Preview Graphic */}
          <div className="w-full md:w-80 h-52 bg-slate-800/80 rounded-2xl border border-slate-700 p-4 relative overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-emerald-400 font-bold">18 PINS ACTIVE</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white">Live Radar Coordinates</h4>
              <p className="text-[11px] text-slate-400">Paris • Tokyo • Bali • Swiss Alps</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. STORIES WORTH FOLLOWING */}
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

      {/* 9. TRAVELER TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase font-extrabold tracking-wider text-[#00875a]">
            Verified Feedback
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Loved by modern explorers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <img src={t.avatar} alt={t.author} className="w-8 h-8 rounded-full" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{t.author}</h4>
                  <p className="text-[10px] text-slate-400">{t.location} • {t.trip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 space-y-2">
          <span className="text-xs uppercase font-extrabold tracking-wider text-[#00875a]">
            Help & Answers
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Frequently asked questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 cursor-pointer"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs text-slate-500 leading-relaxed border-t border-slate-50 pt-2">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 11. NEWSLETTER / CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-[#00875a] p-8 sm:p-14 overflow-hidden text-white flex flex-col justify-between min-h-[260px] shadow-lg">
          <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full border-[30px] border-white/10 pointer-events-none" />

          <div>
            <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white mb-4">
              <Globe2 className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight max-w-xl">
              A better way to keep your world open.
            </h2>
            <p className="mt-2 text-emerald-100 text-xs sm:text-sm max-w-lg">
              Monthly notes on places to go, hidden spots, and how to travel thoughtfully with lighter footprints.
            </p>
          </div>

          {newsletterSubmitted ? (
            <div className="mt-6 p-4 bg-white/20 rounded-2xl max-w-md flex items-center gap-3 backdrop-blur-md">
              <CheckCircle2 className="w-5 h-5 text-amber-300" />
              <span className="text-xs font-bold text-white">
                You're in! Welcome to our monthly travel journal.
              </span>
            </div>
          ) : (
            <form onSubmit={handleNewsletter} className="mt-8 flex flex-col sm:flex-row items-center gap-3 max-w-md">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-5 py-3 rounded-full bg-white/15 placeholder-emerald-200/80 text-white text-xs border border-white/20 focus:outline-none focus:bg-white/25"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-[#fab005] hover:bg-[#f59f00] text-slate-950 font-bold text-xs rounded-full whitespace-nowrap shadow-sm transition-colors cursor-pointer"
              >
                Join the journal
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
