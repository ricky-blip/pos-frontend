import { useState } from "react";

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
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

export default function ItemNoteModal({ isOpen, onClose, onSave, currentItemNote }) {
  const [note, setNote] = useState(currentItemNote || "");

  const handleSave = () => {
    onSave(note.trim());
    onClose();
  };

  const handleClose = () => {
    setNote("");
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/20 px-4 py-8">
      <div className="relative w-full max-w-sm rounded-[22px] bg-white px-6 py-6 shadow-[0_30px_80px_rgba(15,23,42,0.25)]">
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 text-[#6b7280] transition-colors hover:text-[#111827]"
        >
          <CloseIcon />
        </button>

        <h2 className="mb-4 text-center text-lg font-semibold text-[#111827]">
          Item Note
        </h2>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="e.g. Without egg and tofu"
          className="h-32 w-full resize-none rounded-xl border border-[#e6ebf3] px-4 py-3 text-sm text-[#445067] outline-none transition-colors placeholder:text-[#c0c7d4] focus:border-[#3b5bdb]"
        />

        <button
          type="button"
          onClick={handleSave}
          className="mt-4 h-11 w-full rounded-xl bg-[#3b5bdb] text-sm font-medium text-white transition-colors hover:bg-[#3552c7]"
        >
          Save Note
        </button>
      </div>
    </div>
  );
}
