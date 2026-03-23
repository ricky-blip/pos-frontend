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
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      <img
        src={authBackground}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />

      {/* Login Card */}
      <div
        className="relative z-10 bg-white rounded-2xl shadow-2xl px-10 py-10 w-full"
        style={{ maxWidth: 360 }}
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <img src={mainCircleLogo} alt="PadiPos logo" className="w-9 h-9" />
        </div>

        {/* Heading */}
        <h1
          className="text-2xl font-bold text-center mb-1"
          style={{ color: "#1a1a2e", fontFamily: "'Roboto', sans-serif" }}
        >
          Welcome Back!
        </h1>
        <p
          className="text-xs text-center mb-7"
          style={{ color: "#6b7280", fontFamily: "'Roboto', sans-serif" }}
        >
          Please enter your username and password here!
        </p>

        <form onSubmit={handleLogin}>
          {/* Username */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-1"
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
              className="w-full border-b border-gray-300 focus:border-blue-500 outline-none text-sm py-2 px-1 bg-transparent transition-colors"
              style={{ fontFamily: "'Roboto', sans-serif", color: "#374151" }}
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
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
                className="w-full border-b border-gray-300 focus:border-blue-500 outline-none text-sm py-2 px-1 pr-8 bg-transparent transition-colors"
                style={{ fontFamily: "'Roboto', sans-serif", color: "#374151" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end mb-6">
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
            className="w-full py-3 rounded-lg text-white text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-70"
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
          className="text-xs text-center mt-5"
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
  );
}
