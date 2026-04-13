import { createContext, useContext, useState, useCallback } from "react";
import PropTypes from "prop-types";

const ToastContext = createContext();

/**
 * Hook untuk mengakses toast dari mana saja
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

/**
 * ToastProvider - Provider untuk global toast
 * Wraps the app to provide toast functionality globally
 */
export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type, id: Date.now() });
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toast && (
        <ToastItem
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </ToastContext.Provider>
  );
}

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * ToastItem - Component untuk menampilkan toast notification
 */
function ToastItem({ message, type = "success", onClose }) {
  const isSuccess = type === "success";

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 bg-white rounded-lg shadow-lg border-l-4 animate-slide-in-right">
      {/* Left border color based on type */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-lg ${
          isSuccess ? "bg-green-500" : "bg-red-500"
        }`}
      />
      
      {/* Icon */}
      {isSuccess ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-green-500 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-red-500 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )}
      
      {/* Message */}
      <p className="text-sm font-medium text-[#111827] pr-2">{message}</p>
      
      {/* Close button */}
      <button
        onClick={onClose}
        className="text-[#6b7280] hover:text-[#111827] transition-colors flex-shrink-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}

ToastItem.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error"]),
  onClose: PropTypes.func.isRequired,
};

ToastItem.defaultProps = {
  type: "success",
};
