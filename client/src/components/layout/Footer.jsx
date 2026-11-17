import { Link } from "react-router-dom";
import { Compass, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2">
              <Compass className="w-6 h-6 text-emerald-600" />
              <span className="text-lg font-bold tracking-tight text-slate-900">
                Explore<span className="text-emerald-600">World</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-500 max-w-sm">
              Discover breathtaking destinations worldwide, map your trips, and share genuine travel experiences with a vibrant global adventurer community.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
              Explore
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-500">
              <li><Link to="/explore" className="hover:text-emerald-600">Destinations</Link></li>
              <li><Link to="/community" className="hover:text-emerald-600">Travel Feed</Link></li>
              <li><Link to="/trips" className="hover:text-emerald-600">Trip Planner</Link></li>
              <li><Link to="/ai-assistant" className="hover:text-emerald-600">AI Recommendations</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
              Company
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-emerald-600">About Us</a></li>
              <li><a href="#" className="hover:text-emerald-600">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-emerald-600">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} Explore World Inc. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Engineered with modern MERN Stack & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}

