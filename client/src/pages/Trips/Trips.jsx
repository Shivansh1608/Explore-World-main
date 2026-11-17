import { useState } from "react";
import { Plus, Users, Calendar, Wallet, CheckCircle2, MapPin } from "lucide-react";

export default function Trips() {
  const itinerary = [
    {
      day: "01",
      title: "Arrival in Manali",
      desc: "Check in, meet your local host and take a slow walk through the old town.",
      spot: "Mall Road",
    },
    {
      day: "02",
      title: "Solang Valley",
      desc: "Alpine views, cable car ascent, and evening chai with mountain views.",
      spot: "Solang Valley Ridge",
    },
    {
      day: "03",
      title: "Jogini Waterfall Hike",
      desc: "Morning hike through pine forests followed by riverside picnic.",
      spot: "Vashisht Hot Springs",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Trip planner</h1>
          <p className="text-xs text-slate-500 mt-1">
            The places you are going, and the stories you have not lived yet.
          </p>
        </div>
        <button className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#00875a] hover:bg-[#007048] text-white text-xs font-bold rounded-full shadow-sm transition-colors self-start sm:self-auto">
          <Plus className="w-3.5 h-3.5 stroke-[3]" /> Create new trip
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Itinerary Detail Card */}
        <div className="lg:col-span-8 bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-8">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-[#00875a] border border-emerald-200/60 rounded-full">
                Upcoming • 12–16 Oct 2025
              </span>
              <span className="text-slate-300 font-bold tracking-widest text-xs">...</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Manali Adventure</h2>
            <p className="text-xs text-slate-400 mt-1">Himachal Pradesh, India • 5 days</p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Budget
              </span>
              <span className="text-base font-black text-slate-900">₹48,500</span>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Travellers
              </span>
              <span className="text-base font-black text-slate-900">3 people</span>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Progress
              </span>
              <span className="text-base font-black text-slate-900">68%</span>
            </div>
          </div>

          {/* Day by Day Timeline */}
          <div className="space-y-6 pt-2">
            {itinerary.map((item, idx) => (
              <div key={item.day} className="flex items-start gap-4 relative">
                {idx < itinerary.length - 1 && (
                  <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-emerald-100" />
                )}
                <div className="w-8 h-8 rounded-full bg-[#00875a] text-white font-bold text-xs flex items-center justify-center shrink-0 z-10 shadow-xs">
                  {item.day}
                </div>
                <div className="space-y-1 pt-0.5">
                  <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  <p className="text-[11px] font-semibold text-[#00875a] flex items-center gap-1 pt-1">
                    <MapPin className="w-3 h-3" /> {item.spot}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar: Spend overview & Weather */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Spend overview</h3>
            {/* Visual bar distribution */}
            <div className="flex items-end gap-2 h-28 pt-4">
              <div className="flex-1 bg-[#00875a] h-full rounded-lg" title="Stay" />
              <div className="flex-1 bg-[#00875a] h-3/5 rounded-lg" title="Food" />
              <div className="flex-1 bg-[#00875a] h-2/5 rounded-lg" title="Move" />
              <div className="flex-1 bg-[#00875a] h-1/3 rounded-lg" title="Fun" />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 font-medium px-1">
              <span>Stay</span>
              <span>Food</span>
              <span>Move</span>
              <span>Fun</span>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">Spent so far</span>
              <span className="text-sm font-black text-slate-900">₹32,980</span>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-2 shadow-xs">
            <span className="text-[11px] uppercase tracking-wider font-bold text-amber-400">
              Weather window
            </span>
            <h4 className="text-lg font-black tracking-tight">Clear Himalayan skies</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              14°C day / 4°C night expected across Solang. Pack thermal base layers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
