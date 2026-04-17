import { useState } from "react";
import useToastStore from "../../../stores/useToastStore";

/**
 * SettingsPage - Halaman pengaturan untuk admin
 * Fitur:
 * - Account settings (profile picture, email, username, role, status, language)
 * - Password change
 * - Appearance settings (theme, font size, zoom)
 */
export default function SettingsPage() {
  const showToast = useToastStore((s) => s.showToast);
  const [formData, setFormData] = useState({
    email: "johndoe@gmail.com",
    username: "John Doe",
    role: "Admin",
    status: "Active",
    language: "english",
    password: "********",
    preferenceMode: "light",
    fontSize: "16",
    zoomDisplay: "100",
  });
  const [profileImage, setProfileImage] = useState(
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        showToast("Profile picture updated successfully!", "success");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteProfilePicture = () => {
    setProfileImage("https://via.placeholder.com/200x200?text=No+Image");
    showToast("Profile picture deleted", "success");
  };

  const handleChangePassword = () => {
    showToast("Password changed successfully!", "success");
  };

  const handleSaveChanges = () => {
    showToast("Settings saved successfully!", "success");
  };

  return (
    <div className="flex w-full h-full flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#111827]">Settings</h1>
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        {/* Account Section */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-[#111827] mb-4">Account</h2>
          
          {/* Profile Picture */}
          <div className="flex items-center gap-4 mb-5">
            <img
              src={profileImage}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className="flex gap-2">
              <label className="inline-block">
                <span className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors text-sm font-medium inline-block">
                  Change Picture
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="hidden"
                />
              </label>
              <button
                onClick={handleDeleteProfilePicture}
                className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
              >
                Delete Picture
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-1">
                Role
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                readOnly
                className="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm bg-gray-50 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-1">
                Status
              </label>
              <input
                type="text"
                name="status"
                value={formData.status}
                readOnly
                className="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm bg-gray-50 cursor-not-allowed"
              />
            </div>

            {/* Language */}
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-1">
                Language
              </label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="english">English</option>
                <option value="indonesian">Indonesian</option>
              </select>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#e5e7eb] mb-8"></div>

        {/* Password Section */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-[#111827] mb-4">Password</h2>
          
          <div className="max-w-md">
            <label className="block text-sm font-medium text-[#111827] mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
            />
            <button
              onClick={handleChangePassword}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Change Password
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#e5e7eb] mb-8"></div>

        {/* Appearance Section */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-[#111827] mb-4">Appearance</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Preference Mode */}
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-1">
                Preference Mode
              </label>
              <select
                name="preferenceMode"
                value={formData.preferenceMode}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="light">Light Mode</option>
                <option value="dark">Dark Mode</option>
              </select>
            </div>

            {/* Font Size */}
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-1">
                Font Size
              </label>
              <select
                name="fontSize"
                value={formData.fontSize}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="14">14 px</option>
                <option value="16">16 px</option>
                <option value="18">18 px</option>
                <option value="20">20 px</option>
              </select>
            </div>

            {/* Zoom Display */}
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-1">
                Zoom Display
              </label>
              <select
                name="zoomDisplay"
                value={formData.zoomDisplay}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="75">75%</option>
                <option value="100">100 (Normal)</option>
                <option value="125">125%</option>
                <option value="150">150%</option>
              </select>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#e5e7eb] mb-6"></div>

        {/* Save Changes Button */}
        <button
          onClick={handleSaveChanges}
          className="bg-gray-300 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-400 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
