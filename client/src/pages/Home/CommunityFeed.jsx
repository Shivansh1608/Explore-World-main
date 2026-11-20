import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useBookmarks } from "../../context/BookmarkContext";
import {
  Image as ImageIcon,
  ChevronRight,
  Sparkles,
  Send,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MapPin,
  X,
} from "lucide-react";

export default function CommunityFeed() {
  const { user } = useAuth();
  const { bookmarks } = useBookmarks();

  const [newStory, setNewStory] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [showPhotoInput, setShowPhotoInput] = useState(false);
  const [loading, setLoading] = useState(false);

  const starterStories = [
    {
      id: "story-1",
      author: "Maya Kapoor",
      initials: "MK",
      location: "Kyoto, Japan • 2h ago",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80",
      caption: "The quietest morning at Arashiyama. Arrive before 7 and the bamboo grove feels like it belongs only to you. Sunlight filters through in soft green ribbons.",
      likes: 42,
      isLiked: false,
      comments: [
        { author: "Kenji", text: "Best time to visit! Try the matcha soba just down the lane." },
      ],
    },
    {
      id: "story-2",
      author: "Arjun Mehta",
      initials: "AM",
      location: "Manali, India • Yesterday",
      image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80",
      caption: "Woke up above the cloudline at Solang. Crisp Himalayan air, steaming chai, and unbroken silence across the valley peaks.",
      likes: 67,
      isLiked: true,
      comments: [
        { author: "Sophie", text: "Stunning shot! How cold was it in the morning?" },
      ],
    },
    {
      id: "story-3",
      author: "Elena Rostova",
      initials: "ER",
      location: "Bali, Indonesia • 3d ago",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80",
      caption: "Sunset at Uluwatu Temple after an afternoon of coastal trekking. The kecak fire dance as the sun dipped into the Indian Ocean was purely hypnotic.",
      likes: 89,
      isLiked: false,
      comments: [],
    },
  ];

  const [stories, setStories] = useState(starterStories);
  const [openComments, setOpenComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => {
    let isMounted = true;
    const fetchPosts = async () => {
      try {
        const res = await API.get("/posts");
        if (res?.data?.data && res.data.data.length > 0) {
          const apiStories = res.data.data.map((p) => ({
            id: p._id,
            author: p.author?.name || "Fellow Traveler",
            initials: (p.author?.name || "FT").slice(0, 2).toUpperCase(),
            location: p.destination?.name ? `${p.destination.name} • Recent` : "Global Adventure • Recent",
            image: p.images?.[0]?.url || "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80",
            caption: p.content || p.title,
            likes: p.likes?.length || 12,
            isLiked: false,
            comments: [],
          }));
          if (isMounted) {
            setStories([...apiStories, ...starterStories]);
          }
        }
      } catch (e) {
        console.warn("Using local stories feed:", e.message);
      }
    };
    fetchPosts();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleShareStory = async (e) => {
    e.preventDefault();
    if (!newStory.trim()) return;

    setLoading(true);
    const storyItem = {
      id: "local-story-" + Date.now(),
      author: user?.name || "Aarav Rao",
      initials: user?.name ? user.name.slice(0, 2).toUpperCase() : "AR",
      location: "Just now • Travel Story",
      image:
        photoUrl.trim() ||
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
      caption: newStory.trim(),
      likes: 1,
      isLiked: true,
      comments: [],
    };

    try {
      if (user) {
        await API.post("/posts", {
          title: newStory.slice(0, 40),
          content: newStory,
          images: [{ url: storyItem.image }],
        });
      }
    } catch (err) {
      console.warn("Saved story locally:", err.message);
    }

    setStories([storyItem, ...stories]);
    setNewStory("");
    setPhotoUrl("");
    setShowPhotoInput(false);
    setLoading(false);
  };

  const toggleLike = (storyId) => {
    setStories((prev) =>
      prev.map((s) => {
        if (s.id === storyId) {
          const isLiked = !s.isLiked;
          return {
            ...s,
            isLiked,
            likes: isLiked ? s.likes + 1 : s.likes - 1,
          };
        }
        return s;
      })
    );
  };

  const handleAddComment = (storyId) => {
    const text = commentInputs[storyId];
    if (!text || !text.trim()) return;

    setStories((prev) =>
      prev.map((s) => {
        if (s.id === storyId) {
          return {
            ...s,
            comments: [
              ...s.comments,
              { author: user?.name || "Aarav", text: text.trim() },
            ],
          };
        }
        return s;
      })
    );

    setCommentInputs((prev) => ({ ...prev, [storyId]: "" }));
  };

  const trendingPlaces = [
    {
      num: "01",
      name: "Bali",
      slug: "bali",
      country: "Indonesia",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=200&q=80",
    },
    {
      num: "02",
      name: "Manali",
      slug: "manali",
      country: "India",
      image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=200&q=80",
    },
    {
      num: "03",
      name: "Swiss Alps",
      slug: "swiss-alps",
      country: "Switzerland",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80",
    },
    {
      num: "04",
      name: "Paris",
      slug: "paris",
      country: "France",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=200&q=80",
    },
  ];

  const userDisplayName = user?.name || "Aarav Rao";
  const userInitials = userDisplayName.slice(0, 2).toUpperCase();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Community Stories</h1>
        <p className="text-xs text-slate-500 mt-1">
          Real experiences, photos, and recommendations from global travelers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: User Profile Card & Navigation */}
        <div className="lg:col-span-3 space-y-5">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#d3f9d8] text-[#087f5b] font-bold text-sm flex items-center justify-center border border-[#b2f2bb]">
                {userInitials}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">{userDisplayName}</h3>
                <p className="text-xs text-slate-400">Verified Explorer</p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-center">
              <div>
                <span className="text-lg font-black text-slate-900 block leading-tight">{stories.length}</span>
                <span className="text-[11px] text-slate-400 font-medium">Stories</span>
              </div>
              <div>
                <span className="text-lg font-black text-slate-900 block leading-tight">{bookmarks.length}</span>
                <span className="text-[11px] text-slate-400 font-medium">Saved</span>
              </div>
              <div>
                <span className="text-lg font-black text-slate-900 block leading-tight">1.4k</span>
                <span className="text-[11px] text-slate-400 font-medium">Community</span>
              </div>
            </div>
          </div>

          {/* Quick links list */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden divide-y divide-slate-100">
            <Link to="/profile" className="flex items-center justify-between px-6 py-4 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
              <span>My Profile</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link to="/saved" className="flex items-center justify-between px-6 py-4 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
              <span>Wishlist Places ({bookmarks.length})</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link to="/trips" className="flex items-center justify-between px-6 py-4 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
              <span>Plan a Trip</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link to="/explore" className="flex items-center justify-between px-6 py-4 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
              <span>Explore Destinations</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>
        </div>

        {/* Center Column: Share Box & Feed */}
        <div className="lg:col-span-6 space-y-6">
          {/* Post creator box */}
          <form onSubmit={handleShareStory} className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[#d3f9d8] text-[#087f5b] font-bold text-xs flex items-center justify-center border border-[#b2f2bb] shrink-0 mt-0.5">
                {userInitials}
              </div>
              <textarea
                rows={2}
                value={newStory}
                onChange={(e) => setNewStory(e.target.value)}
                placeholder="What did you discover today? Share a travel moment, tip or highlight..."
                className="w-full bg-slate-50 border border-slate-200/70 rounded-2xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00875a]/30 focus:border-[#00875a] resize-none"
              />
            </div>

            {showPhotoInput && (
              <div className="flex items-center gap-2 pl-12">
                <input
                  type="url"
                  placeholder="Paste image URL (e.g. Unsplash URL)..."
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPhotoInput(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowPhotoInput(!showPhotoInput)}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#00875a] transition-colors"
              >
                <ImageIcon className="w-4 h-4 text-slate-500" />
                {photoUrl ? "Photo added ✓" : "Add photo URL"}
              </button>
              <button
                type="submit"
                disabled={loading || !newStory.trim()}
                className="px-5 py-2 bg-[#00875a] hover:bg-[#007048] disabled:opacity-50 text-white text-xs font-bold rounded-full transition-colors shadow-sm flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> {loading ? "Sharing..." : "Share Story"}
              </button>
            </div>
          </form>

          {/* Stories stream */}
          <div className="space-y-6">
            {stories.map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-sm transition-all"
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
                </div>

                {story.image && (
                  <div className="w-full h-80 overflow-hidden bg-slate-100">
                    <img
                      src={story.image}
                      alt={story.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="p-5 space-y-4">
                  <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                    {story.caption}
                  </p>

                  {/* Actions bar: Like, Comment, Share */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleLike(story.id)}
                        className={`flex items-center gap-1.5 font-semibold transition-colors ${
                          story.isLiked ? "text-rose-500 font-bold" : "hover:text-rose-500"
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${story.isLiked ? "fill-rose-500 text-rose-500" : ""}`} />
                        <span>{story.likes}</span>
                      </button>

                      <button
                        onClick={() =>
                          setOpenComments((prev) => ({
                            ...prev,
                            [story.id]: !prev[story.id],
                          }))
                        }
                        className="flex items-center gap-1.5 font-semibold hover:text-[#00875a] transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>{story.comments?.length || 0} Comments</span>
                      </button>
                    </div>
                  </div>

                  {/* Comment Section Dropdown */}
                  {openComments[story.id] && (
                    <div className="pt-3 border-t border-slate-100 space-y-3">
                      {story.comments?.length > 0 && (
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {story.comments.map((c, idx) => (
                            <div key={idx} className="bg-slate-50 p-2.5 rounded-xl text-xs">
                              <span className="font-bold text-slate-800">{c.author}: </span>
                              <span className="text-slate-600">{c.text}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={commentInputs[story.id] || ""}
                          onChange={(e) =>
                            setCommentInputs((prev) => ({
                              ...prev,
                              [story.id]: e.target.value,
                            }))
                          }
                          onKeyDown={(e) => e.key === "Enter" && handleAddComment(story.id)}
                          placeholder="Write a helpful comment or question..."
                          className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                        <button
                          onClick={() => handleAddComment(story.id)}
                          className="px-4 py-2 bg-[#00875a] text-white rounded-full text-xs font-bold hover:bg-[#007048] transition-colors"
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Trending Places */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Trending Destinations</h3>
            <div className="space-y-3 pt-1">
              {trendingPlaces.map((place) => (
                <Link
                  key={place.name}
                  to={`/destinations/${place.slug}`}
                  className="flex items-center gap-3 hover:bg-slate-50 p-2 rounded-2xl transition-colors group"
                >
                  <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-emerald-600">
                    {place.num}
                  </span>
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-10 h-10 rounded-xl object-cover shrink-0"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight group-hover:text-[#00875a]">
                      {place.name}
                    </h4>
                    <p className="text-[11px] text-slate-400">{place.country}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-[#00875a] p-6 rounded-3xl text-white space-y-2 relative overflow-hidden shadow-sm">
            <Sparkles className="w-5 h-5 text-emerald-200" />
            <h4 className="text-base font-black tracking-tight pt-1">Share your journey</h4>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Every photo, hidden alley recommendation, and cafe tip helps fellow adventurers travel more authentically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
