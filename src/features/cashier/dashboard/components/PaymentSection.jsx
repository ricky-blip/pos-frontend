function formatPrice(value) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

export default function PaymentSection({
  total,
  amountPaid,
  onAmountPaidChange,
  quickAmounts,
  isVisible,
}) {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="space-y-3 rounded-2xl border border-[#edf1f7] bg-white px-4 py-3">
      <div>
        <p className="text-xs font-medium text-[#4b5563]">Select Nominal</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {quickAmounts.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => onAmountPaidChange(String(amount))}
              className={`h-10 rounded-xl border text-[11px] transition-colors ${
                Number(amountPaid) === amount
                  ? "border-[#3b5bdb] bg-[#eef4ff] text-[#3b5bdb]"
                  : "border-[#e3e8f1] text-[#9aa3b2] hover:border-[#c5d0e2] hover:text-[#4b5563]"
              }`}
            >
              {formatPrice(amount)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-medium text-[#4b5563]">Enter Nominal here..</label>
        <input
          type="number"
          min={total}
          value={amountPaid}
          onChange={(e) => onAmountPaidChange(e.target.value)}
          placeholder={`Min. ${formatPrice(total)}`}
          className="h-11 w-full rounded-xl border border-[#e6ebf3] px-4 text-sm text-[#445067] outline-none transition-colors placeholder:text-[#c0c7d4] focus:border-[#3b5bdb]"
        />
      </div>
    </div>
  );
}
