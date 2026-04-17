import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { regisService } from "../services/regis.service";
import useToastStore from "../../../stores/useToastStore";

export const useRegisModel = () => {
  const navigate = useNavigate();
  const showToast = useToastStore((s) => s.showToast);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const registerAction = async (username, email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      setError("Password and confirmation do not match");
      return false;
    }

    setIsLoading(true);
    setError("");
    try {
      await regisService.register(username, email, password);
      showToast("Registrasi berhasil, silakan login!");
      navigate("/login");
      return true;
    } catch (err) {
      setError(err.message || "Failed to register. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    registerAction,
    isLoading,
    error,
    setError,
  };
};
