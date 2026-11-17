import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { MapPin, Calendar, DollarSign, Star, User, ArrowLeft, Trash2, Send } from "lucide-react";

export default function DestinationDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [destRes, revRes] = await Promise.all([
          API.get(`/destinations/${id}`),
          API.get(`/reviews/destination/${id}`),
        ]);
        setDestination(destRes.data.data);
        setReviews(revRes.data.data || []);
      } catch (err) {
        console.error("Error loading destination", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to submit a review");
      return;
    }
    setSubmittingReview(true);
    try {
      const res = await API.post(`/reviews/destination/${id}`, { rating, comment });
      setReviews([res.data.data, ...reviews.filter((r) => r._id !== res.data.data._id)]);
      setComment("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this destination?")) return;
    try {
      await API.delete(`/destinations/${id}`);
      navigate("/explore");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete destination");
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-slate-500 animate-pulse">
        Loading destination details...
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">Destination Not Found</h2>
        <Link to="/explore" className="text-emerald-600 font-semibold mt-4 inline-block">
          &larr; Back to Explore
        </Link>
      </div>
    );
  }

  const isOwnerOrAdmin =
    user && (user._id === destination.createdBy?._id || ["admin", "moderator"].includes(user.role));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        to="/explore"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Destinations
      </Link>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Hero Image */}
        <div className="relative w-full h-[400px] bg-slate-900">
          <img
            src={
              destination.images?.[0]?.url ||
              "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80"
            }
            alt={destination.name}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <div className="flex flex-wrap gap-2 mb-3">
              {destination.category?.map((c) => (
                <span
                  key={c}
                  className="bg-emerald-500/90 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md"
                >
                  {c}
                </span>
              ))}
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">{destination.name}</h1>
            <p className="flex items-center gap-1.5 mt-2 text-slate-200 text-sm">
              <MapPin className="w-4 h-4 text-emerald-400" />
              {destination.city ? `${destination.city}, ` : ""}
              {destination.state ? `${destination.state}, ` : ""}
              {destination.country}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">
                  About this destination
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-line">
                  {destination.description}
                </p>
              </div>

              {destination.bestTimeToVisit?.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Recommended Season
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {destination.bestTimeToVisit.map((s) => (
                      <span key={s} className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-semibold text-slate-700">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar quick facts */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 h-fit">
              <div className="border-b border-slate-200 pb-3">
                <span className="text-xs uppercase font-bold text-slate-400 block">Est. Budget</span>
                <span className="text-2xl font-black text-slate-900">
                  {destination.estimatedBudget ? `₹${destination.estimatedBudget.toLocaleString()}` : "Moderate"}
                </span>
              </div>

              <div>
                <span className="text-xs uppercase font-bold text-slate-400 block mb-1">Contributed By</span>
                <div className="flex items-center gap-2">
                  <img
                    src={destination.createdBy?.profileImage || `https://api.dicebear.com/7.x/initials/svg?seed=user`}
                    alt={destination.createdBy?.name || "Member"}
                    className="w-7 h-7 rounded-full"
                  />
                  <span className="text-sm font-semibold text-slate-800">
                    {destination.createdBy?.name || "Community Traveler"}
                  </span>
                </div>
              </div>

              {isOwnerOrAdmin && (
                <button
                  onClick={handleDelete}
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors border border-rose-200"
                >
                  <Trash2 className="w-4 h-4" /> Delete Destination
                </button>
              )}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              Traveler Reviews & Ratings ({reviews.length})
            </h3>

            {/* Add Review Box */}
            {user ? (
              <form onSubmit={handleReviewSubmit} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-8 space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-xs font-bold uppercase text-slate-700">Your Rating:</label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setRating(s)}
                        className={`p-1 ${s <= rating ? "text-amber-500" : "text-slate-300"}`}
                      >
                        <Star className="w-5 h-5 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  rows={3}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience, tips, and highlights about this place..."
                  className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

                <button
                  type="submit"
                  disabled={submittingReview}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" /> {submittingReview ? "Submitting..." : "Post Review"}
                </button>
              </form>
            ) : (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl mb-6 text-xs text-emerald-800">
                <Link to="/login" className="font-bold underline">Login</Link> to share your review and rating.
              </div>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
              {reviews.length === 0 ? (
                <p className="text-sm text-slate-400 italic">No reviews yet. Be the first to rate this place!</p>
              ) : (
                reviews.map((rev) => (
                  <div key={rev._id} className="p-4 rounded-xl border border-slate-100 bg-white shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={rev.author?.profileImage || `https://api.dicebear.com/7.x/initials/svg?seed=user`}
                          alt="Reviewer"
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-xs font-bold text-slate-800">{rev.author?.name}</span>
                      </div>
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {Array.from({ length: rev.rating }).map((_, idx) => (
                          <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
