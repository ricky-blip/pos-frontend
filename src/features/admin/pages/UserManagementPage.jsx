import { useState, useEffect } from "react";
import { userService } from "../services/user.service";
import useToastStore from "../../../stores/useToastStore";

// --- Sub-components ---

function StaffBadge({ role }) {
  const isAdmin = role === "admin";
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
      isAdmin ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
    }`}>
      {isAdmin ? "👨‍💼 Admin" : "💰 Kasir"}
    </span>
  );
}

function StatusBadge({ isActive }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
      isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-green-500" : "bg-red-400"}`} />
      {isActive ? "Aktif" : "Nonaktif"}
    </span>
  );
}

function getInitials(name) {
  if (!name) return "??";
  return name.slice(0, 2).toUpperCase();
}

const ROLE_COLORS = {
  admin: "from-purple-500 to-indigo-500",
  cashier: "from-blue-500 to-cyan-500",
};

// --- Modal: Add / Edit User ---
function UserFormModal({ isOpen, onClose, onSave, editUser }) {
  const [form, setForm] = useState({ username: "", email: "", password: "", role: "cashier" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editUser) {
      setForm({ username: editUser.username, email: editUser.email, password: "", role: editUser.role });
    } else {
      setForm({ username: "", email: "", password: "", role: "cashier" });
    }
  }, [editUser, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { username: form.username, email: form.email, role: form.role };
      if (!editUser) payload.password = form.password;
      await onSave(payload);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-800">
            {editUser ? "✏️ Edit Staf" : "➕ Tambah Staf Baru"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
            <input
              id="um-username"
              type="text" required value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
              placeholder="Contoh: kasir_budi"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              id="um-email"
              type="email" required value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
              placeholder="budi@toko.com"
            />
          </div>
          {!editUser && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <input
                id="um-password"
                type="password" required value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
                placeholder="Min. 6 karakter"
                minLength={6}
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Role</label>
            <select
              id="um-role"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none bg-white"
            >
              <option value="cashier">💰 Kasir</option>
              <option value="admin">👨‍💼 Admin</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors">
              Batal
            </button>
            <button type="submit" id="um-save-btn" disabled={loading}
              className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-xl text-sm font-bold transition-colors">
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- Modal: Reset Password ---
function ResetPasswordModal({ isOpen, onClose, onSave, targetUser }) {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { setNewPassword(""); }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(newPassword);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">🔑 Reset Password</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Reset password untuk <span className="font-semibold text-gray-700">{targetUser?.username}</span>.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password Baru</label>
            <input
              id="um-reset-password"
              type="password" required value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-100 focus:border-amber-500 outline-none"
              placeholder="Min. 6 karakter"
              minLength={6}
            />
          </div>
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors">
              Batal
            </button>
            <button type="submit" id="um-reset-btn" disabled={loading}
              className="flex-1 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white rounded-xl text-sm font-bold transition-colors">
              {loading ? "Mereset..." : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- Modal: Confirm Delete ---
function ConfirmDeleteModal({ isOpen, onClose, onConfirm, targetUser }) {
  const [loading, setLoading] = useState(false);
  if (!isOpen) return null;

  const handleConfirm = async () => {
    setLoading(true);
    try { await onConfirm(); } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <div className="text-center mb-4">
          <div className="text-4xl mb-3">🗑️</div>
          <h2 className="text-lg font-bold text-gray-800">Hapus Staf</h2>
          <p className="text-sm text-gray-500 mt-2">
            Yakin ingin menghapus akun <span className="font-semibold text-red-600">{targetUser?.username}</span>?
            Tindakan ini tidak dapat dibatalkan.
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors">
            Batal
          </button>
          <button id="um-confirm-delete-btn" onClick={handleConfirm} disabled={loading}
            className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white rounded-xl text-sm font-bold transition-colors">
            {loading ? "Menghapus..." : "Ya, Hapus"}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Main Page ---
export default function UserManagementPage() {
  const showToast = useToastStore((s) => s.showToast);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Modal states
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [showReset, setShowReset] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [targetUser, setTargetUser] = useState(null);

  // --- Fetch users ---
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await userService.getAllUsers();
      setUsers(data || []);
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  // --- Handlers ---
  const handleSaveUser = async (payload) => {
    try {
      if (editUser) {
        await userService.updateUser(editUser.id, payload);
        showToast("Data staf berhasil diperbarui!", "success");
      } else {
        await userService.createUser(payload);
        showToast("Staf baru berhasil ditambahkan!", "success");
      }
      setShowForm(false);
      setEditUser(null);
      fetchUsers();
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const handleToggleStatus = async (user) => {
    try {
      await userService.updateUser(user.id, { isActive: !user.isActive });
      showToast(`Akun ${user.username} ${!user.isActive ? "diaktifkan" : "dinonaktifkan"}`, "success");
      fetchUsers();
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const handleResetPassword = async (newPassword) => {
    try {
      await userService.resetPassword(targetUser.id, newPassword);
      showToast(`Password ${targetUser.username} berhasil direset!`, "success");
      setShowReset(false);
      setTargetUser(null);
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const handleDeleteUser = async () => {
    try {
      await userService.deleteUser(targetUser.id);
      showToast(`Akun ${targetUser.username} berhasil dihapus`, "success");
      setShowDelete(false);
      setTargetUser(null);
      fetchUsers();
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const filteredUsers = users.filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex w-full h-full flex-col pb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Manajemen Staf</h1>
          <p className="text-sm text-gray-400 mt-0.5">Kelola akun Admin dan Kasir toko Anda</p>
        </div>
        <button
          id="um-add-btn"
          onClick={() => { setEditUser(null); setShowForm(true); }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-blue-200 transition-all"
        >
          <span className="text-lg leading-none">+</span> Tambah Staf
        </button>
      </div>

      {/* Search & Stats */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          <input
            id="um-search"
            type="text" value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari berdasarkan username atau email..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none bg-white"
          />
        </div>
        <div className="flex gap-3">
          {[
            { label: "Total", value: users.length, color: "bg-gray-100 text-gray-700" },
            { label: "Aktif", value: users.filter((u) => u.isActive).length, color: "bg-green-100 text-green-700" },
            { label: "Nonaktif", value: users.filter((u) => !u.isActive).length, color: "bg-red-100 text-red-600" },
          ].map((stat) => (
            <div key={stat.label} className={`px-4 py-2 rounded-xl text-sm font-semibold ${stat.color}`}>
              {stat.value} {stat.label}
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="text-4xl mb-3 animate-pulse">⏳</div>
            <p className="text-gray-400 text-sm">Memuat data staf...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-4xl mb-3">👤</div>
            <p className="text-gray-500 font-semibold">Belum ada staf terdaftar</p>
            <p className="text-gray-400 text-sm mt-1">Klik "Tambah Staf" untuk menambahkan anggota tim baru</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {["Staf", "Email", "Role", "Status", "Aksi"].map((h) => (
                  <th key={h} className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${ROLE_COLORS[user.role] || "from-gray-400 to-gray-500"} text-sm font-bold text-white flex-shrink-0`}>
                        {getInitials(user.username)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{user.username}</p>
                        <p className="text-xs text-gray-400">ID: {user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500">{user.email}</td>
                  <td className="px-5 py-4"><StaffBadge role={user.role} /></td>
                  <td className="px-5 py-4">
                    <button
                      id={`um-toggle-status-${user.id}`}
                      onClick={() => handleToggleStatus(user)}
                      className="cursor-pointer"
                      title={user.isActive ? "Klik untuk nonaktifkan" : "Klik untuk aktifkan"}
                    >
                      <StatusBadge isActive={user.isActive} />
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        id={`um-edit-${user.id}`}
                        onClick={() => { setEditUser(user); setShowForm(true); }}
                        className="px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        id={`um-reset-pass-${user.id}`}
                        onClick={() => { setTargetUser(user); setShowReset(true); }}
                        className="px-3 py-1.5 text-xs font-semibold text-amber-600 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors"
                      >
                        Reset Pass
                      </button>
                      <button
                        id={`um-delete-${user.id}`}
                        onClick={() => { setTargetUser(user); setShowDelete(true); }}
                        className="px-3 py-1.5 text-xs font-semibold text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modals */}
      <UserFormModal
        isOpen={showForm}
        onClose={() => { setShowForm(false); setEditUser(null); }}
        onSave={handleSaveUser}
        editUser={editUser}
      />
      <ResetPasswordModal
        isOpen={showReset}
        onClose={() => { setShowReset(false); setTargetUser(null); }}
        onSave={handleResetPassword}
        targetUser={targetUser}
      />
      <ConfirmDeleteModal
        isOpen={showDelete}
        onClose={() => { setShowDelete(false); setTargetUser(null); }}
        onConfirm={handleDeleteUser}
        targetUser={targetUser}
      />
    </div>
  );
}
