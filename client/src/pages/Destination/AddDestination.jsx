import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { PlusCircle, MapPin, Sparkles, Image, Tag, ArrowLeft } from "lucide-react";

const CATEGORIES = ["Mountains", "Beaches", "Historical", "Adventure", "Religious", "Wildlife", "Other"];

export default function AddDestination() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    city: "",
    state: "",
    category: ["Mountains"],
    description: "",
    estimatedBudget: "",
    imageUrl: "",
    latitude: "28.6139",
    longitude: "77.2090",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCategoryToggle = (cat) => {
    setFormData((prev) => ({
      ...prev,
      category: prev.category.includes(cat)
        ? prev.category.filter((c) => c !== cat)
        : [...prev.category, cat],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        country: formData.country,
        city: formData.city,
        state: formData.state,
        category: formData.category.length > 0 ? formData.category : ["Other"],
        description: formData.description,
        estimatedBudget: formData.estimatedBudget ? Number(formData.estimatedBudget) : undefined,
        images: formData.imageUrl ? [{ url: formData.imageUrl }] : [],
        location: {
          type: "Point",
          coordinates: [Number(formData.longitude || 0), Number(formData.latitude || 0)],
        },
      };

      const res = await API.post("/destinations", payload);
      navigate(`/destinations/${res.data.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to publish destination");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Go back
      </button>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Add New Destination</h1>
        <p className="text-xs text-slate-500 mt-1">
          Share your favorite place, secret viewpoint, or historic town with fellow explorers.
        </p>

        {error && (
          <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Destination Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Kasol Valley or Amalfi Coast"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Country *
              </label>
              <input
                type="text"
                required
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                placeholder="India, Italy..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                City / Town
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="e.g. Positano"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                State / Region
              </label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                placeholder="e.g. Campania"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Categories
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => handleCategoryToggle(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    formData.category.includes(cat)
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Estimated Budget (₹ / local currency)
            </label>
            <input
              type="number"
              value={formData.estimatedBudget}
              onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
              placeholder="e.g. 12000"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Detailed Description *
            </label>
            <textarea
              rows={5}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe scenery, local foods, cultural highlights, best viewpoints..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm text-sm transition-colors disabled:opacity-50"
          >
            {loading ? "Publishing Destination..." : "Publish Destination"}
          </button>
        </form>
      </div>
    </div>
  );
}
