import { useState } from "react";

function CameraIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SettingsPage() {
  // Account state
  const [profileImage, setProfileImage] = useState(null);
  const [email] = useState("johndoe@gmail.com");
  const [username] = useState("John Doe");
  const [role] = useState("Cashier");
  const [status] = useState("Active");
  const [language, setLanguage] = useState("English");
  
  // Password state
  const [password, setPassword] = useState("********");
  const [showPassword, setShowPassword] = useState(false);
  
  // Appearance state
  const [preferenceMode, setPreferenceMode] = useState("Light Mode");
  const [fontSize, setFontSize] = useState("16 px");
  const [zoomDisplay, setZoomDisplay] = useState("100 (Normal)");

  const handleChangePicture = () => {
    // Future: Open file picker
    console.log("Change picture clicked");
  };

  const handleDeletePicture = () => {
    setProfileImage(null);
  };

  const handleSaveChanges = () => {
    // Future: Save settings to backend
    console.log("Saving changes...");
    alert("Changes saved successfully!");
  };

  return (
    <div className="w-full">
      {/* Page Title */}
      <h1 className="mb-6 text-2xl font-bold text-[#111827]">Settings</h1>

      <div className="space-y-6">
          {/* Account Section */}
          <section className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <h2 className="mb-5 text-lg font-semibold text-[#111827]">Account</h2>

            {/* Profile Picture */}
            <div className="mb-6 flex items-center gap-4">
              <div className="relative">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="h-20 w-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f6d365_0%,#fda085_100%)] text-2xl font-bold text-white">
                    JD
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleChangePicture}
                  className="flex items-center gap-2 rounded-lg bg-[#3b5bdb] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#3552c7]"
                >
                  <CameraIcon />
                  Change Picture
                </button>
                <button
                  type="button"
                  onClick={handleDeletePicture}
                  className="flex items-center gap-2 rounded-lg border border-[#d1d5db] bg-white px-4 py-2 text-sm font-medium text-[#6b7280] transition-colors hover:bg-[#f9fafb]"
                >
                  <TrashIcon />
                  Delete Picture
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#4b5563]">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  readOnly
                  className="h-11 w-full rounded-xl border border-[#e6ebf3] bg-[#f9fafb] px-4 text-sm text-[#445067] outline-none"
                />
              </div>

              {/* Username */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#4b5563]">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  readOnly
                  className="h-11 w-full rounded-xl border border-[#e6ebf3] bg-[#f9fafb] px-4 text-sm text-[#445067] outline-none"
                />
              </div>

              {/* Role */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#4b5563]">
                  Role
                </label>
                <input
                  type="text"
                  value={role}
                  readOnly
                  className="h-11 w-full rounded-xl border border-[#e6ebf3] bg-[#f9fafb] px-4 text-sm text-[#445067] outline-none"
                />
              </div>

              {/* Status */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#4b5563]">
                  Status
                </label>
                <input
                  type="text"
                  value={status}
                  readOnly
                  className="h-11 w-full rounded-xl border border-[#e6ebf3] bg-[#f9fafb] px-4 text-sm text-[#445067] outline-none"
                />
              </div>

              {/* Language */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#4b5563]">
                  Language
                </label>
                <div className="relative">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="h-11 w-full appearance-none rounded-xl border border-[#e6ebf3] bg-white px-4 pr-10 text-sm text-[#445067] outline-none transition-colors focus:border-[#3b5bdb]"
                  >
                    <option value="English">English</option>
                    <option value="Indonesian">Indonesian</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9aa3b2]">
                    <ChevronDownIcon />
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Password Section */}
          <section className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <h2 className="mb-5 text-lg font-semibold text-[#111827]">Password</h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#4b5563]">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 w-full rounded-xl border border-[#e6ebf3] px-4 pr-10 text-sm text-[#445067] outline-none transition-colors focus:border-[#3b5bdb]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9aa3b2] transition-colors hover:text-[#6b7280]"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="mt-4 rounded-lg bg-[#3b5bdb] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#3552c7]"
            >
              Change Password
            </button>
          </section>

          {/* Appearance Section */}
          <section className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <h2 className="mb-5 text-lg font-semibold text-[#111827]">Appearance</h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Preference Mode */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#4b5563]">
                  Preference Mode
                </label>
                <div className="relative">
                  <select
                    value={preferenceMode}
                    onChange={(e) => setPreferenceMode(e.target.value)}
                    className="h-11 w-full appearance-none rounded-xl border border-[#e6ebf3] bg-white px-4 pr-10 text-sm text-[#445067] outline-none transition-colors focus:border-[#3b5bdb]"
                  >
                    <option value="Light Mode">Light Mode</option>
                    <option value="Dark Mode">Dark Mode</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9aa3b2]">
                    <ChevronDownIcon />
                  </span>
                </div>
              </div>

              {/* Font Size */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#4b5563]">
                  Font Size
                </label>
                <div className="relative">
                  <select
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                    className="h-11 w-full appearance-none rounded-xl border border-[#e6ebf3] bg-white px-4 pr-10 text-sm text-[#445067] outline-none transition-colors focus:border-[#3b5bdb]"
                  >
                    <option value="14 px">14 px</option>
                    <option value="16 px">16 px</option>
                    <option value="18 px">18 px</option>
                    <option value="20 px">20 px</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9aa3b2]">
                    <ChevronDownIcon />
                  </span>
                </div>
              </div>

              {/* Zoom Display */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#4b5563]">
                  Zoom Display
                </label>
                <div className="relative">
                  <select
                    value={zoomDisplay}
                    onChange={(e) => setZoomDisplay(e.target.value)}
                    className="h-11 w-full appearance-none rounded-xl border border-[#e6ebf3] bg-white px-4 pr-10 text-sm text-[#445067] outline-none transition-colors focus:border-[#3b5bdb]"
                  >
                    <option value="75%">75%</option>
                    <option value="100 (Normal)">100 (Normal)</option>
                    <option value="125%">125%</option>
                    <option value="150%">150%</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9aa3b2]">
                    <ChevronDownIcon />
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Save Changes Button */}
          <div className="flex justify-start">
            <button
              type="button"
              onClick={handleSaveChanges}
              className="rounded-xl bg-[#3b5bdb] px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-[#3552c7]"
            >
              Save Changes
            </button>
          </div>
      </div>
    </div>
  );
}
