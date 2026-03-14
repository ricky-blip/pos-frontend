import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import SplashScreen from "./features/splashscreen/SplashScreen"
import LoginPage from "./features/auth/pages/LoginPage"
import RegisPage from "./features/auth/pages/RegisPage"
import ResetPassPage from "./features/auth/pages/ResetPassPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisPage />} />
        <Route path="/reset-password" element={<ResetPassPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App