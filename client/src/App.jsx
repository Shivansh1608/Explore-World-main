import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { BookmarkProvider } from "./context/BookmarkContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Pages
import Home from "./pages/Home/Home";
import Explore from "./pages/Explore/Explore";
import DestinationDetail from "./pages/Destination/DestinationDetail";
import AddDestination from "./pages/Destination/AddDestination";
import CommunityFeed from "./pages/Home/CommunityFeed";
import Trips from "./pages/Trips/Trips";
import MapsView from "./pages/Home/MapsView";
import AiAssistant from "./pages/Home/AiAssistant";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./pages/Profile/Profile";
import SavedPlaces from "./pages/Saved/SavedPlaces";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-10 text-center text-slate-400">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <BookmarkProvider>
        <Router>
          <div className="min-h-screen bg-[#fafbfc] text-slate-800 flex flex-col justify-between selection:bg-emerald-100 selection:text-emerald-800 font-sans">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/destinations/:id" element={<DestinationDetail />} />
                <Route path="/destinations/new" element={<AddDestination />} />
                <Route path="/community" element={<CommunityFeed />} />
                <Route path="/trips" element={<Trips />} />
                <Route path="/maps" element={<MapsView />} />
                <Route path="/ai-assistant" element={<AiAssistant />} />
                <Route path="/saved" element={<SavedPlaces />} />
                <Route path="/profile" element={<Profile />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute allowedRoles={["admin", "moderator"]}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </BookmarkProvider>
    </AuthProvider>
  );
}

export default App;
