import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginModel } from "../models/login.model";
import authBackground from "../../../assets/images/auth_background.png";
import mainCircleLogo from "../../../assets/images/main_circle_logo.png";

export default function LoginPage() {
  const navigate = useNavigate();
  const { loginAction, isLoading, error } = useLoginModel();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    await loginAction(username, password);
  };

  return (
    <div className="flex min-h-dvh w-full items-center justify-center bg-[#d9d9d9]">
      <div
        className="relative h-dvh w-full overflow-hidden bg-white"
        style={{
          minHeight: "100dvh",
        }}
      >
        <img
          src={authBackground}
          alt="background"
          className="absolute inset-0 h-full w-full object-fill"
        />
        <div className="absolute inset-0 bg-black/12" />

        {/* Login Card */}
        <div className="relative z-10 flex h-full items-center px-4 py-8 sm:px-8 md:px-10 lg:px-14">
          <div
            className="w-full rounded-[24px] bg-white/97 px-6 py-8 shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-[2px] sm:px-8 sm:py-9 lg:ml-4"
            style={{ maxWidth: 430 }}
          >
            {/* Logo */}
            <div className="mb-6 flex items-center justify-center gap-2">
              <img
                src={mainCircleLogo}
                alt="PadiPos logo"
                className="w-22 object-contain"
              />
            </div>

            {/* Heading */}
            <h1
              className="mb-1 text-center text-2xl font-bold"
              style={{ color: "#1a1a2e", fontFamily: "'Roboto', sans-serif" }}
            >
              Welcome Back!
            </h1>
            <p
              className="mb-7 text-center text-xs"
              style={{ color: "#6b7280", fontFamily: "'Roboto', sans-serif" }}
            >
              Please enter your username and password here!
            </p>

            <form onSubmit={handleLogin}>
              {/* Error Message */}
              {error && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Username */}
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="mb-1 block text-sm font-medium"
                  style={{ color: "#374151", fontFamily: "'Roboto', sans-serif" }}
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-blue-500"
                  style={{ fontFamily: "'Roboto', sans-serif", color: "#374151" }}
                />
              </div>

              {/* Password */}
              <div className="mb-2">
                <label
                  htmlFor="password"
                  className="mb-1 block text-sm font-medium"
                  style={{ color: "#374151", fontFamily: "'Roboto', sans-serif" }}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-10 text-sm outline-none transition-colors focus:border-blue-500"
                    style={{ fontFamily: "'Roboto', sans-serif", color: "#374151" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
                    tabIndex={-1}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="mb-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => navigate("/reset-password")}
                  className="text-xs hover:underline"
                  style={{ color: "#6b7280", fontFamily: "'Roboto', sans-serif" }}
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-70"
                style={{
                  backgroundColor: "#3B5BDB",
                  fontFamily: "'Roboto', sans-serif",
                }}
              >
                {isLoading ? (
                  <>
                    <svg className="h-4 w-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memuat...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            {/* Register link */}
            <p
              className="mt-5 text-center text-xs"
              style={{ color: "#6b7280", fontFamily: "'Roboto', sans-serif" }}
            >
              Don&apos;t have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="font-semibold hover:underline"
                style={{ color: "#3B5BDB" }}
              >
                Register
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
