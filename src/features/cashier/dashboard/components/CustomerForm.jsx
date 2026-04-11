function ChevronIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7 10l5 5 5-5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export default function CustomerForm({
  orderType,
  customerName,
  tableNumber,
  onCustomerNameChange,
  onTableNumberChange,
}) {
  return (
    <div className="grid grid-cols-1 gap-3 border-b border-[#edf1f7] pb-6 xl:grid-cols-[1.25fr_1fr]">
      <div>
        <label className="mb-1 block text-sm font-medium text-[#4b5563]">
          {orderType === "dine-in" ? "Customer Name" : "Customer / Receiver Name"}
        </label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => onCustomerNameChange(e.target.value)}
          placeholder={orderType === "dine-in" ? "Customer Name" : "Receiver Name"}
          className="h-11 w-full rounded-xl border border-[#e6ebf3] px-4 text-sm text-[#445067] outline-none transition-colors placeholder:text-[#c0c7d4] focus:border-[#3b5bdb]"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#4b5563]">
          {orderType === "dine-in" ? "No.Table" : "Pickup Type"}
        </label>
        <div className="relative">
          <select
            value={tableNumber}
            onChange={(e) => onTableNumberChange(e.target.value)}
            className="h-11 w-full appearance-none rounded-xl border border-[#e6ebf3] px-4 text-sm text-[#9aa3b2] outline-none transition-colors focus:border-[#3b5bdb]"
          >
            {orderType === "dine-in" ? (
              <>
                <option value="">Select No.Table</option>
                <option value="1">Table 1</option>
                <option value="2">Table 2</option>
                <option value="3">Table 3</option>
                <option value="4">Table 4</option>
                <option value="5">Table 5</option>
              </>
            ) : (
              <>
                <option value="">Select Pickup Type</option>
                <option value="self-pickup">Self Pickup</option>
                <option value="driver-pickup">Driver Pickup</option>
              </>
            )}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9aa3b2]">
            <ChevronIcon />
          </span>
        </div>
      </div>
    </div>
  );
}
