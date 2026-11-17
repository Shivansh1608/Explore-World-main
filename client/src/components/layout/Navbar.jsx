import { Link, useNavigate } from "react-router-dom";
import { Compass, User, LogOut, PlusCircle, MapPin, Sparkles, Shield, Bookmark } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <Compass className="w-8 h-8 text-emerald-600" />
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Explore<span className="text-emerald-600">World</span>
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
              <Link to="/explore" className="hover:text-emerald-600 transition-colors">
                Destinations
              </Link>
              <Link to="/community" className="hover:text-emerald-600 transition-colors">
                Feed
              </Link>
              <Link to="/trips" className="hover:text-emerald-600 transition-colors">
                Trip Planner
              </Link>
              <Link to="/ai-assistant" className="flex items-center gap-1 hover:text-emerald-600 transition-colors">
                <Sparkles className="w-4 h-4 text-emerald-500" /> AI Guide
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/destinations/new"
                  className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors"
                >
                  <PlusCircle className="w-3.5 h-3.5" /> Add Destination
                </Link>

                {["admin", "moderator"].includes(user.role) && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    <Shield className="w-3.5 h-3.5" /> Admin
                  </Link>
                )}

                <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                  <img
                    src={user.profileImage || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border border-slate-200"
                  />
                  <span className="text-sm font-medium text-slate-800 hidden lg:inline">
                    {user.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    title="Logout"
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
