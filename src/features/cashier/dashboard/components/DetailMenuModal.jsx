import { useState } from "react";

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function formatPrice(value) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

export default function DetailMenuModal({ isOpen, onClose, menu, onSubmit }) {
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({ ...menu, note });
    }
    onClose();
    setNote("");
  };

  const handleClose = () => {
    setNote("");
    onClose();
  };

  if (!isOpen || !menu) {
    return null;
  }

  const categoryLabel =
    menu.category === "foods" ? "Food" : menu.category === "beverages" ? "Drink" : "Dessert";

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/20 px-4 py-8">
      <div className="relative w-full max-w-md rounded-[22px] bg-white px-6 py-6 shadow-[0_30px_80px_rgba(15,23,42,0.25)]">
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 text-[#6b7280] transition-colors hover:text-[#111827]"
        >
          <CloseIcon />
        </button>

        <h2 className="mb-4 text-center text-lg font-semibold text-[#111827]">Detail Menu</h2>

        <div className="space-y-4">
          <div className="overflow-hidden rounded-xl">
            <img src={menu.image} alt={menu.name} className="h-48 w-full object-cover" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#4b6ef2] px-2 py-0.5 text-[10px] text-white">
                {categoryLabel}
              </span>
            </div>
            <h3 className="mt-2 text-xl font-semibold text-[#141c2d]">{menu.name}</h3>
            <p className="mt-1 text-sm text-[#6b7280]">{menu.description}</p>
            <p className="mt-2 text-lg font-semibold text-[#3b5bdb]">
              {formatPrice(menu.price)}
              <span className="ml-1 text-sm font-normal text-[#9aa3b2]">/{menu.unit}</span>
            </p>
          </div>

          <div className="border-t border-[#edf1f7] pt-4">
            <label className="mb-2 block text-sm font-medium text-[#4b5563]">
              Catatan
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add note here..."
              className="h-24 w-full resize-none rounded-xl border border-[#e6ebf3] px-4 py-3 text-sm text-[#445067] outline-none transition-colors placeholder:text-[#c0c7d4] focus:border-[#3b5bdb]"
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!note.trim()}
            className={`h-12 w-full rounded-xl text-sm font-medium transition-colors ${
              note.trim()
                ? "bg-[#3b5bdb] text-white hover:bg-[#3552c7]"
                : "cursor-not-allowed bg-[#e5e7eb] text-[#9ca3af]"
            }`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
