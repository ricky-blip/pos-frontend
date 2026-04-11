function formatPrice(value) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

export default function OrderSummary({ subtotal, tax, total }) {
  return (
    <div className="rounded-2xl border border-[#edf1f7] bg-white px-4 py-3">
      <div className="space-y-2 border-b border-dashed border-[#d7deea] pb-3">
        <div className="flex items-center justify-between text-xs text-[#9aa3b2]">
          <span>Sub Total</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-[#9aa3b2]">
          <span>Tax</span>
          <span>{formatPrice(tax)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3">
        <span className="text-sm text-[#4b5563]">Total</span>
        <span className="text-[28px] font-semibold leading-none text-[#2b2f38]">
          {formatPrice(total)}
        </span>
      </div>
    </div>
  );
}
