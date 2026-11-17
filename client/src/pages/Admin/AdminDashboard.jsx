import { useState, useEffect } from "react";
import API from "../../services/api";
import { Shield, Users, MapPin, FileText, CheckCircle, Clock } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [statsRes, usersRes] = await Promise.all([
          API.get("/admin/stats"),
          API.get("/admin/users"),
        ]);
        setStats(statsRes.data.data);
        setUsers(usersRes.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await API.patch(`/admin/users/${userId}/role`, { role: newRole });
      setUsers(
        users.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
      );
    } catch {
      alert("Failed to update user role");
    }
  };

  if (loading) {
    return <div className="p-10 text-center text-slate-500">Loading admin portal...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-2 mb-8">
        <Shield className="w-8 h-8 text-purple-600" />
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Platform Governance</h1>
          <p className="text-xs text-slate-500">System overview, content moderation and user roles.</p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs uppercase font-bold text-slate-400 block">Total Users</span>
          <span className="text-3xl font-black text-slate-900 mt-1 block">{stats?.totalUsers || 0}</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs uppercase font-bold text-slate-400 block">Destinations</span>
          <span className="text-3xl font-black text-emerald-600 mt-1 block">{stats?.totalDestinations || 0}</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs uppercase font-bold text-slate-400 block">Social Posts</span>
          <span className="text-3xl font-black text-blue-600 mt-1 block">{stats?.totalPosts || 0}</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs uppercase font-bold text-slate-400 block">Pending Reviews</span>
          <span className="text-3xl font-black text-amber-500 mt-1 block">{stats?.pendingDestinations || 0}</span>
        </div>
      </div>

      {/* User Management Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">User Directory & Roles</h3>
          <span className="text-xs text-slate-400">Total: {users.length} members</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 uppercase font-bold tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Joined</th>
                <th className="px-6 py-3">Assigned Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-3.5 font-bold flex items-center gap-2">
                    <img
                      src={u.profileImage || `https://api.dicebear.com/7.x/initials/svg?seed=user`}
                      alt=""
                      className="w-6 h-6 rounded-full"
                    />
                    {u.name}
                  </td>
                  <td className="px-6 py-3.5 text-slate-500">{u.email}</td>
                  <td className="px-6 py-3.5 text-slate-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-3.5">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u._id, e.target.value)}
                      className="px-2 py-1 bg-slate-100 rounded text-slate-800 font-semibold focus:outline-none"
                    >
                      <option value="user">User</option>
                      <option value="blogger">Blogger</option>
                      <option value="moderator">Moderator</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
