import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import colors from "../../constants/colors"

export default function SplashScreen() {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

  //MOUNT (Init)
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 50)

    const redirectTimer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => navigate("/login"), 600)
    }, 3000)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(redirectTimer)
    }
  }, [navigate])

  return (
    <div
      style={{
        transition: "opacity 0.6s ease",
        opacity: fadeOut ? 0 : 1,
        fontFamily: "'Roboto', sans-serif",
        backgroundColor: colors.background,
      }}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(${colors.primaryLight}4D 1px, transparent 1px),
            linear-gradient(90deg, ${colors.primaryLight}4D 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow orb kiri bawah */}
      <div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-20"
        style={{
          background: `radial-gradient(circle, ${colors.primary} 0%, transparent 70%)`,
          transform: "translate(-30%, 30%)",
        }}
      />

      {/* Glow orb kanan atas */}
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-15"
        style={{
          background: `radial-gradient(circle, ${colors.primaryLight} 0%, transparent 70%)`,
          transform: "translate(30%, -30%)",
        }}
      />

      {/* Konten utama */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Ikon / logo */}
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center mb-2"
          style={{
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%)`,
            boxShadow: `0 0 40px ${colors.primary}80`,
          }}
        >
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.white}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
        </div>

        {/* Nama app */}
        <div className="text-center">
          <h1
            className="text-5xl tracking-tight"
            style={{ fontWeight: 700, letterSpacing: "-0.02em", color: colors.textPrimary }}
          >
            POS <span style={{ color: colors.primary }}>System</span>
          </h1>
          <p
            className="text-sm mt-2 uppercase"
            style={{ color: colors.textSecondary, letterSpacing: "0.25em", fontWeight: 300 }}
          >
            Point of Sale
          </p>
        </div>

        {/* Progress bar */}
        <div className="mt-8 w-56">
          <div
            className="w-full h-1 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-100"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${colors.primary}, ${colors.primaryLight})`,
                boxShadow: `0 0 8px ${colors.primaryLight}99`,
              }}
            />
          </div>
          <p
            className="text-center text-xs mt-3"
            style={{ color: colors.textMuted, fontWeight: 400 }}
          >
            Memuat ...
          </p>
        </div>
      </div>

      {/* Versi */}
      <p
        className="absolute bottom-6 text-xs"
        style={{ color: colors.textMuted, fontWeight: 300 }}
      >
        v1.0.0
      </p>
    </div>
  )
}