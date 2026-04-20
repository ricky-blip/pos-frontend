import { useState } from "react";
import useAuthStore from "../../../stores/useAuthStore";
import useToastStore from "../../../stores/useToastStore";
import { authService } from "../../auth/services/auth.service";

function getInitials(name) {
  if (!name) return "??";
  const parts = name.split(" ");
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return parts[0].slice(0, 2).toUpperCase();
}

export default function SettingsPage() {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const showToast = useToastStore((s) => s.showToast);

  const roleLabel = user?.role === "admin" ? "Admin" : "Kasir";

  // --- Profile Edit ---
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    currentPassword: "",
  });
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // --- Password Change ---
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    if (!profileData.currentPassword) {
      return showToast("Masukkan password saat ini untuk konfirmasi perubahan", "error");
    }

    try {
      setIsSavingProfile(true);
      const updatedUser = await authService.updateProfile(profileData.currentPassword, {
        username: profileData.username,
        email: profileData.email,
      });

      // Update Zustand store with new user data
      setUser({ ...user, username: updatedUser.username, email: updatedUser.email });
      showToast("Profil berhasil diperbarui!", "success");
      setIsEditingProfile(false);
      setProfileData((prev) => ({ ...prev, currentPassword: "" }));
    } catch (error) {
      showToast(error.message || "Gagal memperbarui profil", "error");
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return showToast("Password baru dan konfirmasi tidak cocok!", "error");
    }
    if (passwordData.newPassword.length < 6) {
      return showToast("Password baru minimal 6 karakter!", "error");
    }

    try {
      setIsChangingPassword(true);
      await authService.changePassword(passwordData.oldPassword, passwordData.newPassword);
      showToast("Password berhasil diubah!", "success");
      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      showToast(error.message || "Gagal mengubah password", "error");
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="flex w-full h-full flex-col pb-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#111827]">Settings</h1>
        <p className="text-sm text-gray-400 mt-0.5">Kelola profil dan keamanan akun Anda</p>
      </div>

      <div className="flex-1 space-y-6">
        {/* ── Account Profile Section ── */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-[#111827]">Account Profile</h2>
            {!isEditingProfile ? (
              <button
                id="settings-edit-profile-btn"
                onClick={() => setIsEditingProfile(true)}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
              >
                ✏️ Edit Profil
              </button>
            ) : (
              <button
                onClick={() => { setIsEditingProfile(false); setProfileData({ username: user?.username || "", email: user?.email || "", currentPassword: "" }); }}
                className="px-4 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-100 rounded-xl transition-colors"
              >
                Batal
              </button>
            )}
          </div>

          <div className="flex items-center gap-6 mb-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#3b5bdb] to-[#5c7cfa] text-2xl font-bold text-white shadow-lg border-4 border-white flex-shrink-0">
              {getInitials(user?.username)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{user?.username}</h3>
              <p className="text-sm text-blue-600 font-medium">{roleLabel}</p>
              <p className="text-xs text-gray-400 mt-0.5 italic">Avatar dibuat otomatis dari inisial nama</p>
            </div>
          </div>

          {!isEditingProfile ? (
            // --- Read-only view ---
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { label: "Username", value: user?.username },
                { label: "Email", value: user?.email },
                { label: "Status", value: "Active", isGreen: true },
              ].map((item) => (
                <div key={item.label}>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{item.label}</label>
                  <div className={`px-4 py-3 rounded-xl text-sm font-medium ${item.isGreen ? "bg-green-50 border border-green-100 text-green-700" : "bg-gray-50 border border-gray-100 text-gray-600"}`}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // --- Edit form ---
            <form onSubmit={handleProfileSave} className="space-y-4 max-w-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Username Baru</label>
                  <input
                    id="settings-username-input"
                    type="text" value={profileData.username}
                    onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email Baru</label>
                  <input
                    id="settings-email-input"
                    type="email" value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                <label className="block text-sm font-semibold text-amber-800 mb-1">🔐 Konfirmasi Password Saat Ini</label>
                <input
                  id="settings-confirm-password-input"
                  type="password" required value={profileData.currentPassword}
                  onChange={(e) => setProfileData({ ...profileData, currentPassword: e.target.value })}
                  className="w-full px-4 py-2.5 border border-amber-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-100 focus:border-amber-500 outline-none bg-white"
                  placeholder="Diperlukan untuk menyimpan perubahan"
                />
                <p className="text-xs text-amber-600 mt-1.5">Untuk keamanan, masukkan password Anda saat ini untuk mengkonfirmasi perubahan data profil.</p>
              </div>
              <button
                type="submit"
                id="settings-save-profile-btn"
                disabled={isSavingProfile}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-blue-200 transition-all"
              >
                {isSavingProfile ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </form>
          )}
        </div>

        {/* ── Password Section ── */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-[#111827] mb-6">Security & Password</h2>

          <form onSubmit={handlePasswordChange} className="max-w-xl space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password Sekarang</label>
              <input
                id="settings-old-password"
                type="password" required value={passwordData.oldPassword}
                onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
                placeholder="Masukkan password lama"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Password Baru</label>
                <input
                  id="settings-new-password"
                  type="password" required value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
                  placeholder="Min. 6 karakter"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Konfirmasi Password Baru</label>
                <input
                  id="settings-confirm-password"
                  type="password" required value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
                  placeholder="Ulangi password baru"
                />
              </div>
            </div>
            <div className="pt-1">
              <button
                type="submit"
                id="settings-update-password-btn"
                disabled={isChangingPassword}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-md shadow-blue-200 transition-all"
              >
                {isChangingPassword ? "Memproses..." : "Update Password"}
              </button>
            </div>
          </form>
        </div>

        {/* ── Preferences (Coming Soon) ── */}
        <div className="bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-200 opacity-60">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-400">Application Preferences</h2>
            <span className="text-[10px] bg-gray-200 text-gray-500 px-2 py-0.5 rounded font-bold uppercase">Coming Soon</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {["Display Mode", "Language", "Font Size"].map((pref) => (
              <div key={pref}>
                <label className="block text-xs font-bold text-gray-400 mb-2">{pref}</label>
                <div className="h-10 bg-white border border-gray-100 rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
