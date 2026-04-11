import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authBackground from "../../../assets/images/auth_background.png";
import mainCircleLogo from "../../../assets/images/main_circle_logo.png";

export default function ResetPassPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 700);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="flex min-h-dvh w-full items-center justify-center bg-[#d9d9d9]">
      <div
        className="relative h-dvh w-full overflow-hidden bg-white"
        style={{ minHeight: "100dvh" }}
      >
        <img
          src={authBackground}
          alt="background"
          className="absolute inset-0 h-full w-full object-fill"
        />
        <div className="absolute inset-0 bg-black/12" />

        <div className="relative z-10 flex h-full items-center px-4 py-8 sm:px-8 md:px-10 lg:px-14">
          <div
            className="w-full rounded-[24px] bg-white/97 px-6 py-8 shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-[2px] sm:px-8 sm:py-9 lg:ml-4"
            style={{ maxWidth: 430 }}
          >
            <div className="mb-6 flex items-center justify-center gap-2">
              <img
                src={mainCircleLogo}
                alt="PadiPos logo"
                className="w-22 object-contain"
              />
            </div>

            <h1
              className="mb-1 text-center text-2xl font-bold"
              style={{ color: "#1a1a2e", fontFamily: "'Roboto', sans-serif" }}
            >
              Reset Password
            </h1>
            <p
              className="mb-7 text-center text-xs"
              style={{ color: "#6b7280", fontFamily: "'Roboto', sans-serif" }}
            >
              {step === 1
                ? "Please enter your registered email here!"
                : "Please enter your new password and confirm"}
            </p>

            {step === 1 ? (
              <form onSubmit={handleEmailSubmit}>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm font-medium"
                    style={{ color: "#374151", fontFamily: "'Roboto', sans-serif" }}
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-blue-500"
                    style={{ fontFamily: "'Roboto', sans-serif", color: "#374151" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-lg py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-70"
                  style={{
                    backgroundColor: "#3B5BDB",
                    fontFamily: "'Roboto', sans-serif",
                  }}
                >
                  {isLoading ? "Loading..." : "Submit"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetPassword}>
                <div className="mb-4">
                  <label
                    htmlFor="newPassword"
                    className="mb-1 block text-sm font-medium"
                    style={{ color: "#374151", fontFamily: "'Roboto', sans-serif" }}
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-10 text-sm outline-none transition-colors focus:border-blue-500"
                      style={{ fontFamily: "'Roboto', sans-serif", color: "#374151" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
                      tabIndex={-1}
                    >
                      {showNewPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="confirmPassword"
                    className="mb-1 block text-sm font-medium"
                    style={{ color: "#374151", fontFamily: "'Roboto', sans-serif" }}
                  >
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm New Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-10 text-sm outline-none transition-colors focus:border-blue-500"
                      style={{ fontFamily: "'Roboto', sans-serif", color: "#374151" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-lg py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-70"
                  style={{
                    backgroundColor: "#3B5BDB",
                    fontFamily: "'Roboto', sans-serif",
                  }}
                >
                  {isLoading ? "Loading..." : "Reset Password"}
                </button>
              </form>
            )}

            <p
              className="mt-5 text-center text-xs"
              style={{ color: "#6b7280", fontFamily: "'Roboto', sans-serif" }}
            >
              Remember your password?{" "}
              <button
                onClick={() => navigate("/login")}
                className="font-semibold hover:underline"
                style={{ color: "#3B5BDB" }}
              >
                Back to Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
