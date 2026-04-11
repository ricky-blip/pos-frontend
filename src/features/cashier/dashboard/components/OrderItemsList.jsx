import { useState } from "react";
import ItemNoteModal from "./ItemNoteModal";

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 7h14M10 11v5M14 11v5M8 7l1-2h6l1 2M8 7v11a1 1 0 001 1h6a1 1 0 001-1V7"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 12h12" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 6v12M6 12h12"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 20l4.5-1 8.8-8.8a2.1 2.1 0 10-3-3L5.5 16 4 20z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function formatPrice(value) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

export default function OrderItemsList({ items, onIncrement, onDecrement, onRemove, onNoteChange }) {
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleOpenNoteModal = (itemId) => {
    setSelectedItemId(itemId);
    setIsNoteModalOpen(true);
  };

  const handleCloseNoteModal = () => {
    setIsNoteModalOpen(false);
    setSelectedItemId(null);
  };

  const handleSaveNote = (note) => {
    if (selectedItemId && onNoteChange) {
      onNoteChange(selectedItemId, note);
    }
  };

  const selectedItem = items.find((item) => item.id === selectedItemId);

  return (
    <>
      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-[#edf1f7] bg-white p-3">
              <div className="flex items-start gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-14 w-14 rounded-xl object-cover"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-[13px] font-semibold text-[#141c2d]">{item.name}</h3>
                      {item.note && (
                        <p className="mt-1 text-[11px] text-[#6b7280] italic">{item.note}</p>
                      )}
                      <p className="mt-1 text-[11px] text-[#4b6ef2]">{formatPrice(item.price)}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemove(item.id)}
                      className="text-[#ff6b6b] transition-colors hover:text-[#ef4444]"
                    >
                      <TrashIcon />
                    </button>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handleOpenNoteModal(item.id)}
                      className={`flex items-center gap-1 text-[11px] transition-colors ${
                        item.note
                          ? "text-[#3b5bdb] hover:text-[#3552c7]"
                          : "text-[#b4bccc] hover:text-[#9aa3b2]"
                      }`}
                    >
                      <PencilIcon />
                      <span>{item.note ? "Edit note" : "Write a note"}</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onDecrement(item.id)}
                        className="flex h-5 w-5 items-center justify-center rounded-full border border-[#d8dfea] text-[#9aa3b2] transition-colors hover:border-[#3b5bdb] hover:text-[#3b5bdb]"
                      >
                        <MinusIcon />
                      </button>
                      <span className="min-w-4 text-center text-xs font-medium text-[#4b5563]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onIncrement(item.id)}
                        className="flex h-5 w-5 items-center justify-center rounded-full border border-[#3b5bdb] text-[#3b5bdb] transition-colors hover:bg-[#eef4ff]"
                      >
                        <PlusIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ItemNoteModal
        isOpen={isNoteModalOpen}
        onClose={handleCloseNoteModal}
        onSave={handleSaveNote}
        currentItemNote={selectedItem?.note || ""}
      />
    </>
  );
}
