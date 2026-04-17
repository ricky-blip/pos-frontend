import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/login.service";
import useAuthStore from "../../../stores/useAuthStore";

export const useLoginModel = () => {
  const navigate = useNavigate();
  const setStoreUser = useAuthStore((s) => s.login);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const loginAction = async (username, password) => {
    setIsLoading(true);
    setError("");
    try {
      const { user, access_token } = await loginService.login(username, password);
      
      // Simpan credentials di format global state
      setStoreUser({ ...user, token: access_token });

      // Redirect sesuai role
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
      return true;
    } catch (err) {
      setError(err.message || "Failed to login. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    loginAction,
    isLoading,
    error,
    setError,
  };
};
