import { Link } from "react-router-dom";
import { Compass, Sparkles, MapPin, Users, Calendar, ArrowRight, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 via-white to-slate-50 pt-16 pb-24 sm:pt-24 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100/80 text-emerald-800 rounded-full text-xs font-bold border border-emerald-200 mb-6">
            <Compass className="w-3.5 h-3.5" /> Next-Gen Travel Discovery & Social Network
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
            Discover Places. Share Experiences.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
              Explore Together.
            </span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Uncover off-the-beaten-path locations, connect with seasoned adventurers, build custom itineraries, and get personalized AI travel guidance.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/explore"
              className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
            >
              Explore Destinations <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/ai-assistant"
              className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl border border-slate-200 shadow-sm transition-all flex items-center justify-center gap-2 text-sm"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" /> Plan with AI
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Pillar Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Crowdsourced Atlas</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Real destinations submitted by travelers, complete with realistic budget estimates, seasonal advisories, and genuine reviews.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs">
            <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Traveler Community</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Share your adventures, post travel photos, like stories, and exchange first-hand travel insights directly with explorers worldwide.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Smart AI Planner</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Input your budget, departure city, and travel duration to receive an instant, AI-tailored daily itinerary and cost estimate.
            </p>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-600 rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl relative overflow-hidden">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Ready to Start Your Journey?
          </h2>
          <p className="mt-3 text-emerald-100 max-w-xl mx-auto text-sm sm:text-base">
            Join thousands of travelers cataloging world landmarks and hidden viewpoints.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/register"
              className="px-6 py-3 bg-white text-emerald-800 font-bold rounded-xl text-sm shadow-sm hover:bg-emerald-50 transition-colors"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
