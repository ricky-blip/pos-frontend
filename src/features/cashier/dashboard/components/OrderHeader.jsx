function SaveIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7 5.5h10a1.5 1.5 0 011.5 1.5v12l-6.5-3-6.5 3V7A1.5 1.5 0 017 5.5z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function ExitIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"></line>
      <line x1="8" y1="12" x2="21" y2="12"></line>
      <line x1="8" y1="18" x2="21" y2="18"></line>
      <line x1="3" y1="6" x2="3.01" y2="6"></line>
      <line x1="3" y1="12" x2="3.01" y2="12"></line>
      <line x1="3" y1="18" x2="3.01" y2="18"></line>
    </svg>
  );
}

export default function OrderHeader({ onHoldOrder, onOpenDrafts, draftCount, isHoldDisabled, onEndShift }) {
  return (
    <div className="mb-5 flex items-start justify-between">
      <div>
        <h2 className="text-[30px] font-semibold text-[#111827]">List Order</h2>
        <p className="mt-1 text-xs text-[#b0b7c3]">No Order&nbsp; ORD#{Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}</p>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onHoldOrder}
          disabled={isHoldDisabled}
          title="Hold Order"
          className="rounded-xl border border-[#dce3ef] p-2 text-[#9aa3b2] transition-colors hover:border-orange-500 hover:text-orange-500 disabled:opacity-50 disabled:hover:border-[#dce3ef] disabled:hover:text-[#9aa3b2]"
        >
          <SaveIcon />
        </button>
        
        <button
          type="button"
          onClick={onOpenDrafts}
          title="Draft Orders"
          className="relative rounded-xl border border-[#dce3ef] p-2 text-[#9aa3b2] transition-colors hover:border-[#3b5bdb] hover:text-[#3b5bdb]"
          )}
        </button>

        <button
          type="button"
          onClick={onEndShift}
          title="Tutup Shift"
          className="rounded-xl border border-red-100 bg-red-50 p-2 text-red-500 transition-colors hover:bg-red-500 hover:text-white"
        >
          <ExitIcon />
        </button>
      </div>
    </div>
  );
}
