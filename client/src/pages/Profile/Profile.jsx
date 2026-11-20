import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useBookmarks } from "../../context/BookmarkContext";
import {
  User,
  Mail,
  Calendar,
  Shield,
  Bookmark,
  MapPin,
  Compass,
  LogOut,
  Edit3,
  CheckCircle2,
  FolderHeart,
  Luggage,
} from "lucide-react";

export default function Profile() {
  const { user, logout } = useAuth();
  const { bookmarks } = useBookmarks();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("saved");
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "Aarav Rao");
  const [bio, setBio] = useState(user?.bio || "Himalayan trekker, slow travel advocate & landscape photographer.");

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      await logout();
      navigate("/login");
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const displayName = user?.name || name;
  const displayEmail = user?.email || "aarav@exploreworld.com";
  const displayBio = user?.bio || bio;
  const displayRole = user?.role || "Explorer";

  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-[#d3f9d8] text-[#087f5b] font-black text-2xl flex items-center justify-center border-2 border-[#b2f2bb] shadow-sm shrink-0">
              {initials}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">{displayName}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wide">
                  {displayRole}
                </span>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" /> {displayEmail}
              </p>
              <p className="text-xs text-slate-600 max-w-xl pt-1 leading-relaxed">
                {displayBio}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 border border-slate-200 rounded-full text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" /> {isEditing ? "Close" : "Edit Profile"}
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200/80 rounded-full text-xs font-bold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign out
            </button>
          </div>
        </div>

        {/* Edit Form Modal/Drawer */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 gap-4 max-w-xl">
            <div>
              <label className="text-xs font-bold uppercase text-slate-500 block mb-1">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-[#00875a]/30"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-slate-500 block mb-1">Bio / Travel Motto</label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-[#00875a]/30"
              />
            </div>
            <button
              type="submit"
              className="self-start px-5 py-2 bg-[#00875a] text-white rounded-full text-xs font-bold hover:bg-[#007048] transition-colors"
            >
              Save Changes
            </button>
          </form>
        )}

        {/* Quick Stats Banner */}
        <div className="grid grid-cols-3 gap-4 pt-6 mt-6 border-t border-slate-100 max-w-md">
          <div>
            <span className="text-xl font-black text-slate-900 block leading-tight">{bookmarks.length}</span>
            <span className="text-[11px] text-slate-400 font-medium">Saved Places</span>
          </div>
          <div>
            <span className="text-xl font-black text-slate-900 block leading-tight">3</span>
            <span className="text-[11px] text-slate-400 font-medium">Planned Trips</span>
          </div>
          <div>
            <span className="text-xl font-black text-slate-900 block leading-tight">12</span>
            <span className="text-[11px] text-slate-400 font-medium">Stories Shared</span>
          </div>
        </div>
      </div>

      {/* Profile Tabs */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200">
          <button
            onClick={() => setActiveTab("saved")}
            className={`pb-3 px-4 text-xs font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "saved"
                ? "border-[#00875a] text-[#00875a]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <FolderHeart className="w-4 h-4" /> Wishlist ({bookmarks.length})
          </button>
          <button
            onClick={() => setActiveTab("trips")}
            className={`pb-3 px-4 text-xs font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "trips"
                ? "border-[#00875a] text-[#00875a]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Luggage className="w-4 h-4" /> My Trips (1 Upcoming)
          </button>
        </div>

        {activeTab === "saved" && (
          <div>
            {bookmarks.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">
                No saved places yet. Browse{" "}
                <Link to="/explore" className="text-emerald-600 font-bold underline">
                  Explore
                </Link>{" "}
                to bookmark dream destinations!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {bookmarks.slice(0, 6).map((dest) => (
                  <div key={dest._id || dest.id} className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs">
                    <img src={dest.image} alt={dest.name} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <h4 className="text-sm font-bold text-slate-900">{dest.name}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{dest.city ? `${dest.city}, ` : ""}{dest.country}</p>
                      <Link
                        to={`/destinations/${dest._id || dest.id}`}
                        className="mt-3 block text-xs font-bold text-[#00875a] hover:underline"
                      >
                        View Destination &gt;
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "trips" && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-[#00875a] uppercase">Upcoming Itinerary</span>
              <h3 className="text-base font-black text-slate-900">Manali & Solang Expedition</h3>
              <p className="text-xs text-slate-500">5 Days • 3 Travellers • Budget ₹48,500</p>
            </div>
            <Link
              to="/trips"
              className="px-4 py-2 bg-[#00875a] text-white rounded-full text-xs font-bold hover:bg-[#007048] transition-colors"
            >
              Open Trip Planner
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
