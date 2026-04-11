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

export default function OrderHeader() {
  return (
    <div className="mb-5 flex items-start justify-between">
      <div>
        <h2 className="text-[30px] font-semibold text-[#111827]">List Order</h2>
        <p className="mt-1 text-xs text-[#b0b7c3]">No Order&nbsp; ORD#1234567890</p>
      </div>

      <button
        type="button"
        className="rounded-xl border border-[#dce3ef] p-2 text-[#9aa3b2] transition-colors hover:border-[#3b5bdb] hover:text-[#3b5bdb]"
      >
        <SaveIcon />
      </button>
    </div>
  );
}
