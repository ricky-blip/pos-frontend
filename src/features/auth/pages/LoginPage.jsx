import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authBackground from "../../../assets/images/auth_background.png";
import mainCircleLogo from "../../../assets/images/main_circle_logo.png";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1000);
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
                className="w-full rounded-lg py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-70"
                style={{
                  backgroundColor: "#3B5BDB",
                  fontFamily: "'Roboto', sans-serif",
                }}
              >
                {isLoading ? "Loading..." : "Login"}
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
