export default function OrderTypeToggle({ orderType, onChange }) {
  return (
    <div className="mb-5 grid grid-cols-2 gap-2 rounded-2xl bg-white">
      {[
        { id: "dine-in", label: "Dine in" },
        { id: "take-away", label: "Take Away" },
      ].map((option) => {
        const isActive = orderType === option.id;

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={`h-12 rounded-xl border text-sm font-medium transition-all ${
              isActive
                ? "border-[#3b5bdb] bg-[#3b5bdb] text-white"
                : "border-[#d9e0ea] bg-white text-[#9aa3b2] hover:border-[#bfcbe0] hover:text-[#4b5563]"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
