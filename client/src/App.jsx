import { useEffect, useState } from "react";
import axios from "axios";
import { Compass, CheckCircle2, AlertCircle } from "lucide-react";

function App() {
  const [status, setStatus] = useState("Checking...");
  const [timestamp, setTimestamp] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
    axios
      .get(`${apiUrl}/health`)
      .then((response) => {
        setStatus(response.data.message);
        setTimestamp(response.data.timestamp);
      })
      .catch(() => {
        setError("Backend connection failed. Ensure server is running on port 5000.");
        setStatus("Disconnected");
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between">
      <nav className="flex items-center justify-between px-8 py-5 bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Compass className="w-8 h-8 text-emerald-600 animate-spin-slow" />
          <h1 className="text-2xl font-bold tracking-tight text-emerald-600">
            Explore World
          </h1>
        </div>
        <div className="flex items-center gap-6 font-medium text-slate-600 text-sm">
          <a href="#" className="hover:text-emerald-600 transition-colors">Home</a>
          <a href="#" className="hover:text-emerald-600 transition-colors">Explore</a>
          <a href="#" className="hover:text-emerald-600 transition-colors">Trips</a>
          <a href="#" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors shadow-sm">
            Login
          </a>
        </div>
      </nav>

      <main className="flex flex-col items-center justify-center flex-1 text-center px-5 py-12">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-6">
          Phase 1: Project Foundation & Architecture
        </span>
        <h2 className="text-5xl font-extrabold text-slate-900 tracking-tight sm:text-6xl max-w-3xl leading-tight">
          Discover Places. Share Experiences. <span className="text-emerald-600">Explore Together.</span>
        </h2>
        <p className="mt-5 text-lg text-slate-500 max-w-2xl">
          A production-grade, full-stack travel discovery and social networking platform built with the MERN stack.
        </p>

        <div className="mt-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-sm border border-slate-200 text-left">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <span className="text-xs uppercase tracking-wider font-bold text-slate-400">System Integration Status</span>
            {error ? (
              <span className="flex items-center gap-1 text-xs text-rose-600 font-semibold">
                <AlertCircle className="w-4 h-4" /> Offline
              </span>
            ) : status === "Checking..." ? (
              <span className="text-xs text-amber-600 font-semibold animate-pulse">Connecting...</span>
            ) : (
              <span className="flex items-center gap-1 text-xs text-emerald-600 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Connected
              </span>
            )}
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Frontend:</span>
              <span className="font-semibold text-slate-700">React + Vite + Tailwind CSS</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Backend API:</span>
              <span className="font-semibold text-slate-700">Node.js + Express.js</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Database:</span>
              <span className="font-semibold text-slate-700">MongoDB + Mongoose</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Health Check:</span>
              <span className={`font-semibold ${error ? "text-rose-600" : "text-emerald-700"}`}>
                {status}
              </span>
            </div>
            {timestamp && (
              <div className="flex justify-between py-1 text-xs text-slate-400">
                <span>Timestamp:</span>
                <span>{new Date(timestamp).toLocaleTimeString()}</span>
              </div>
            )}
            {error && (
              <div className="mt-3 p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700">
                {error}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="py-6 border-t border-slate-200 text-center text-xs text-slate-400">
        Explore World &copy; {new Date().getFullYear()} &bull; Built with Modular Monolith Architecture
      </footer>
    </div>
  );
}

export default App;
