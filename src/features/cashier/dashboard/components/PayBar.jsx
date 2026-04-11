export default function PayBar({ disabled = true, onClick }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`mt-5 h-12 w-full rounded-xl text-sm font-medium transition-colors ${
        disabled
          ? "cursor-not-allowed bg-[#d3d3d3] text-white"
          : "bg-[#3b5bdb] text-white hover:bg-[#3552c7]"
      }`}
    >
      Pay
    </button>
  );
}
