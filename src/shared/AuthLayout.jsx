import { Outlet } from "react-router-dom";
import authBackground from "../assets/images/auth_background.png";

/**
 * AuthLayout - Layout untuk halaman authentication
 * - Full screen dengan background image
 * - Tidak ada header/sidebar
 * - Centered content
 */
export default function AuthLayout() {
  return (
    <div className="relative h-dvh w-full overflow-hidden bg-white" style={{ minHeight: "100dvh" }}>
      {/* Background Image */}
      <img
        src={authBackground}
        alt="background"
        className="absolute inset-0 h-full w-full object-fill"
      />
      <div className="absolute inset-0 bg-black/12" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center px-4 py-8 sm:px-8 md:px-10 lg:px-14">
        <Outlet />
      </div>
    </div>
  );
}
