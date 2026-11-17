import { useState, useEffect } from "react";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { Heart, MessageSquare, Send, Image, Compass } from "lucide-react";

export default function CommunityFeed() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");
      setPosts(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please log in to post");
    setPosting(true);
    try {
      const payload = {
        title,
        content,
        images: imageUrl ? [{ url: imageUrl }] : [],
      };
      const res = await API.post("/posts", payload);
      setPosts([res.data.data, ...posts]);
      setTitle("");
      setContent("");
      setImageUrl("");
    } catch (err) {
      alert("Failed to share post");
    } finally {
      setPosting(false);
    }
  };

  const handleLike = async (postId) => {
    if (!user) return alert("Please log in to like posts");
    try {
      const res = await API.post(`/posts/${postId}/like`);
      setPosts(
        posts.map((p) => {
          if (p._id === postId) {
            const hasLiked = p.likes?.includes(user._id);
            const newLikes = hasLiked
              ? p.likes.filter((id) => id !== user._id)
              : [...(p.likes || []), user._id];
            return { ...p, likes: newLikes };
          }
          return p;
        })
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Traveler Feed</h1>
        <p className="text-xs text-slate-500 mt-1">
          Real-time stories, photos, and updates from adventurers around the globe.
        </p>
      </div>

      {/* Share Box */}
      {user && (
        <form onSubmit={handleCreatePost} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm mb-8 space-y-3">
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post Title (e.g. Hiking the Dolomites at sunrise...)"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <textarea
            rows={3}
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your travel experience, recommendations, or questions..."
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Photo URL (optional)..."
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <div className="flex justify-end pt-1">
            <button
              type="submit"
              disabled={posting}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Send className="w-3.5 h-3.5" /> {posting ? "Sharing..." : "Post to Feed"}
            </button>
          </div>
        </form>
      )}

      {/* Feed Stream */}
      <div className="space-y-6">
        {loading ? (
          <p className="text-center text-sm text-slate-400 animate-pulse">Loading feed...</p>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
            <Compass className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-600">No posts shared yet!</p>
          </div>
        ) : (
          posts.map((post) => {
            const isLiked = user && post.likes?.includes(user._id);
            return (
              <div key={post._id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-4 flex items-center gap-3">
                  <img
                    src={post.author?.profileImage || `https://api.dicebear.com/7.x/initials/svg?seed=user`}
                    alt="Author"
                    className="w-9 h-9 rounded-full"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{post.author?.name || "Traveler"}</h4>
                    <span className="text-[11px] text-slate-400">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="px-5 pb-3">
                  <h3 className="text-base font-bold text-slate-900 mb-1">{post.title}</h3>
                  <p className="text-sm text-slate-600 whitespace-pre-line leading-relaxed">
                    {post.content}
                  </p>
                </div>

                {post.images?.[0]?.url && (
                  <div className="w-full max-h-96 bg-slate-100 overflow-hidden">
                    <img
                      src={post.images[0].url}
                      alt="Post content"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="px-5 py-3 border-t border-slate-100 flex items-center gap-6">
                  <button
                    onClick={() => handleLike(post._id)}
                    className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                      isLiked ? "text-rose-600" : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? "fill-current text-rose-600" : ""}`} />
                    <span>{post.likes?.length || 0} Likes</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
