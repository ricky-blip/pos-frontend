import useToastStore from "../stores/useToastStore";

/**
 * ToastNotification - Komponen UI untuk menampilkan toast notification
 * Membaca state dari useToastStore (Zustand)
 * Diletakkan di App.jsx agar bisa muncul di semua halaman
 */
export default function ToastNotification() {
  const toast = useToastStore((s) => s.toast);
  const hideToast = useToastStore((s) => s.hideToast);

  if (!toast) return null;

  const isSuccess = toast.type === "success";

  return (
    <div
      key={toast.id}
      className="fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 bg-white rounded-lg shadow-lg border-l-4 animate-slide-in-right"
    >
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
      <p className="text-sm font-medium text-[#111827] pr-2">{toast.message}</p>

      {/* Close button */}
      <button
        onClick={hideToast}
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
