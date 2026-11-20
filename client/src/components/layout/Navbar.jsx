import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Compass,
  Search,
  Bell,
  MessageSquare,
  User as UserIcon,
  Bookmark,
  Luggage,
  Shield,
  LogOut,
  X,
  Menu,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useBookmarks } from "../../context/BookmarkContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { bookmarks } = useBookmarks();
  const location = useLocation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Himalayan trek guide updated",
      desc: "Fresh permits and winter routes added for Manali.",
      time: "10m ago",
      unread: true,
    },
    {
      id: 2,
      title: "Maya Kapoor liked your story",
      desc: "Great sunrise shot at Solang Valley!",
      time: "2h ago",
      unread: true,
    },
    {
      id: 3,
      title: "Trip reminder",
      desc: "Your trip to Manali starts in 4 weeks.",
      time: "1d ago",
      unread: false,
    },
  ]);

  const [messagesList, setMessagesList] = useState([
    {
      id: 1,
      sender: "Arjun Mehta (Host)",
      avatar: "AM",
      text: "Hey! Let me know if you need rental bikes for Rohtang Pass.",
      time: "25m ago",
    },
    {
      id: 2,
      sender: "Elena (Bali Guide)",
      avatar: "ER",
      text: "The waterfalls in Ubud are pristine right now. See you soon!",
      time: "Yesterday",
    },
  ]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/explore");
    }
  };

  const handleLogout = async () => {
    setShowUserMenu(false);
    await logout();
    navigate("/login");
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/explore" },
    { name: "Community", path: "/community" },
    { name: "Trips", path: "/trips" },
    { name: "Maps", path: "/maps" },
    { name: "AI Assistant", path: "/ai-assistant" },
  ];

  const initials = user?.name
    ? user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
    : "AR";

  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Logo & Main Nav */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#00875a] flex items-center justify-center text-white shadow-sm">
              <Compass className="w-6 h-6 stroke-[2.2]" />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900 font-sans">
              Explore<span className="text-[#00875a]">World</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => {
              const isActive =
                item.path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${isActive
                    ? "bg-[#e3fcef] text-[#00875a]"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right side: Search pill & user avatar / notifications */}
        <div className="flex items-center gap-3">
          <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destinations..."
              className="w-64 pl-11 pr-4 py-2 bg-slate-50 border border-slate-200/80 rounded-full text-xs font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00875a]/30 focus:border-[#00875a]"
            />
          </form>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowUserMenu(false);
                setShowMessages(false);
              }}
              title="Notifications"
              className="relative p-2 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-50 transition-colors"
            >
              <Bell className="w-5 h-5 stroke-[1.8]" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full"></span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Notifications ({unreadCount})
                  </h4>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-[11px] font-bold text-[#00875a] hover:underline"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="divide-y divide-slate-50 max-h-64 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`py-2.5 px-2 rounded-xl text-left transition-colors ${n.unread ? "bg-emerald-50/50" : "hover:bg-slate-50"
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">{n.title}</span>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Messages Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowMessages(!showMessages);
                setShowNotifications(false);
                setShowUserMenu(false);
              }}
              title="Messages"
              className="p-2 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-50 transition-colors"
            >
              <MessageSquare className="w-5 h-5 stroke-[1.8]" />
            </button>

            {showMessages && (
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Messages</h4>
                  <Link
                    to="/community"
                    onClick={() => setShowMessages(false)}
                    className="text-[11px] font-bold text-[#00875a] hover:underline"
                  >
                    Community
                  </Link>
                </div>
                <div className="divide-y divide-slate-50">
                  {messagesList.map((m) => (
                    <div key={m.id} className="py-3 px-2 hover:bg-slate-50 rounded-xl cursor-pointer">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#00875a] font-bold text-[10px] flex items-center justify-center">
                          {m.avatar}
                        </div>
                        <span className="text-xs font-bold text-slate-800">{m.sender}</span>
                        <span className="text-[10px] text-slate-400 ml-auto">{m.time}</span>
                      </div>
                      <p className="text-xs text-slate-500 truncate">{m.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Saved Wishlist Link Pill */}
          <Link
            to="/saved"
            title="Saved places wishlist"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200/80 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-200 transition-colors"
          >
            <Bookmark className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{bookmarks.length}</span>
          </Link>

          {/* User Section */}
          {user ? (
            <div className="relative shrink-0">
              <button
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowNotifications(false);
                  setShowMessages(false);
                }}
                className="flex items-center gap-2 p-1.5 pl-3 rounded-full border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition-all cursor-pointer whitespace-nowrap shadow-2xs"
              >
                <span className="text-xs font-bold text-slate-800 hidden sm:inline">
                  {user.name.split(" ")[0]}
                </span>
                <div className="w-8 h-8 rounded-full bg-[#00875a] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </div>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                  </div>

                  <div className="py-1">
                    <Link
                      to="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <UserIcon className="w-4 h-4 text-slate-400" /> My Profile
                    </Link>
                    <Link
                      to="/saved"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <Bookmark className="w-4 h-4 text-slate-400" /> Saved Places ({bookmarks.length})
                    </Link>
                    <Link
                      to="/trips"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <Luggage className="w-4 h-4 text-slate-400" /> My Trips
                    </Link>

                    {user?.role && ["admin", "moderator"].includes(user.role) && (
                      <Link
                        to="/admin"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-amber-600 hover:bg-amber-50"
                      >
                        <Shield className="w-4 h-4 text-amber-500" /> Admin Dashboard
                      </Link>
                    )}
                  </div>

                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" /> Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 shrink-0 whitespace-nowrap">
              <Link
                to="/login"
                className="px-4 py-2 rounded-full text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors inline-block whitespace-nowrap"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 rounded-full bg-[#00875a] hover:bg-[#007048] text-white text-xs font-bold shadow-xs transition-colors inline-block whitespace-nowrap"
              >
                Sign up
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-100 px-4 py-4 space-y-2">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/saved"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Saved Places ({bookmarks.length})
          </Link>
          <Link
            to="/profile"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            My Profile
          </Link>
        </div>
      )}
    </header>
  );
}

