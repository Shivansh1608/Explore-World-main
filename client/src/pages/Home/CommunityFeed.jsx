import { useState } from "react";
import { Link } from "react-router-dom";
import { Image, ChevronRight, Sparkles, Send } from "lucide-react";

export default function CommunityFeed() {
  const [newStory, setNewStory] = useState("");

  const trendingPlaces = [
    {
      num: "01",
      name: "Bali",
      country: "Indonesia",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=200&q=80",
    },
    {
      num: "02",
      name: "Manali",
      country: "India",
      image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=200&q=80",
    },
    {
      num: "03",
      name: "Swiss Alps",
      country: "Switzerland",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80",
    },
    {
      num: "04",
      name: "Paris",
      country: "France",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=200&q=80",
    },
  ];

  const stories = [
    {
      author: "Maya Kapoor",
      initials: "MK",
      location: "Kyoto, Japan • 2h ago",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80",
      caption: "The quietest morning at Arashiyama. Arrive before 7 and the bamboo grove feels like it belongs only to you.",
    },
    {
      author: "Arjun Mehta",
      initials: "AM",
      location: "Manali, India • Yesterday",
      image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80",
      caption: "Woke up above the cloudline at Solang. Crisp Himalayan air, steaming chai, and unbroken silence.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Community</h1>
        <p className="text-xs text-slate-500 mt-1">
          Stories, tips and the people making the world feel a little smaller.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: User Profile Card & Navigation */}
        <div className="lg:col-span-3 space-y-5">
          {/* User mini badge */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#d3f9d8] text-[#087f5b] font-bold text-sm flex items-center justify-center border border-[#b2f2bb]">
                AR
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Aarav Rao</h3>
                <p className="text-xs text-slate-400">Delhi, India</p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-center">
              <div>
                <span className="text-lg font-black text-slate-900 block leading-tight">24</span>
                <span className="text-[11px] text-slate-400 font-medium">Posts</span>
              </div>
              <div>
                <span className="text-lg font-black text-slate-900 block leading-tight">1.2k</span>
                <span className="text-[11px] text-slate-400 font-medium">Followers</span>
              </div>
              <div>
                <span className="text-lg font-black text-slate-900 block leading-tight">18</span>
                <span className="text-[11px] text-slate-400 font-medium">Places</span>
              </div>
            </div>
          </div>

          {/* Quick links list */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden divide-y divide-slate-100">
            <Link to="/profile" className="flex items-center justify-between px-6 py-4 text-xs font-semibold text-slate-700 hover:bg-slate-50">
              <span>My profile</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link to="/saved" className="flex items-center justify-between px-6 py-4 text-xs font-semibold text-slate-700 hover:bg-slate-50">
              <span>Saved places</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link to="/trips" className="flex items-center justify-between px-6 py-4 text-xs font-semibold text-slate-700 hover:bg-slate-50">
              <span>Plan a trip</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link to="/messages" className="flex items-center justify-between px-6 py-4 text-xs font-semibold text-slate-700 hover:bg-slate-50">
              <span>Messages</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>
        </div>

        {/* Center Column: Share Box & Feed */}
        <div className="lg:col-span-6 space-y-6">
          {/* Post creator box */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#d3f9d8] text-[#087f5b] font-bold text-xs flex items-center justify-center border border-[#b2f2bb] shrink-0">
                AR
              </div>
              <input
                type="text"
                value={newStory}
                onChange={(e) => setNewStory(e.target.value)}
                placeholder="What did you discover today?"
                className="w-full bg-slate-50 border border-slate-200/70 rounded-2xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00875a]/30 focus:border-[#00875a]"
              />
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900">
                <Image className="w-4 h-4 text-slate-500" /> Add photo
              </button>
              <button className="px-5 py-2 bg-[#00875a] hover:bg-[#007048] text-white text-xs font-bold rounded-full transition-colors shadow-sm">
                Share story
              </button>
            </div>
          </div>

          {/* Stories stream */}
          <div className="space-y-6">
            {stories.map((story, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs"
              >
                <div className="p-4 flex items-center justify-between border-b border-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#d3f9d8] text-[#087f5b] font-bold text-xs flex items-center justify-center border border-[#b2f2bb]">
                      {story.initials}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{story.author}</h4>
                      <p className="text-[11px] text-slate-400">{story.location}</p>
                    </div>
                  </div>
                  <span className="text-slate-300 font-bold tracking-widest text-xs">...</span>
                </div>

                <div className="w-full h-80 overflow-hidden bg-slate-100">
                  <img
                    src={story.image}
                    alt={story.author}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-5">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {story.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Trending Places & Callout */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Trending places</h3>
            <div className="space-y-3 pt-1">
              {trendingPlaces.map((place) => (
                <div key={place.name} className="flex items-center gap-3 hover:bg-slate-50 p-1.5 rounded-2xl transition-colors cursor-pointer">
                  <span className="text-xs font-mono font-bold text-slate-400">{place.num}</span>
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-10 h-10 rounded-xl object-cover shrink-0"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">{place.name}</h4>
                    <p className="text-[11px] text-slate-400">{place.country}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#00875a] p-6 rounded-3xl text-white space-y-2 relative overflow-hidden">
            <Sparkles className="w-5 h-5 text-emerald-200" />
            <h4 className="text-base font-black tracking-tight pt-1">Find your people.</h4>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Follow travellers with a point of view and build a feed that feels like a window on the world.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
