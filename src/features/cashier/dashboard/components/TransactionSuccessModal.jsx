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

function formatPrice(value) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

export default function TransactionSuccessModal({
  isOpen,
  onClose,
  orderType,
  customerName,
  tableNumber,
  items,
  subtotal,
  tax,
  total,
  amountPaid,
}) {
  if (!isOpen) {
    return null;
  }

  const firstItem = items[0];
  const change = Math.max(Number(amountPaid || 0) - total, 0);

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/20 px-4 py-8">
      <div className="relative w-full max-w-md rounded-[22px] bg-white px-7 py-8 shadow-[0_30px_80px_rgba(15,23,42,0.25)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-[#6b7280] transition-colors hover:text-[#111827]"
        >
          <CloseIcon />
        </button>

        <h2 className="mb-5 text-center text-[20px] font-semibold text-[#111827]">
          Transaction Success
        </h2>

        <div className="rounded-2xl bg-[#f7f8fb] p-4">
          <div className="space-y-1 border-b border-[#e3e8f1] pb-3 text-[11px] text-[#7f8797]">
            <p>No Order : ORD#1234567890</p>
            <p>Order Date : Rabu, 10 April 2026 12:30:00</p>
            <p>Cashier : John Doe</p>
            <p>
              {orderType === "dine-in" ? "Dine-In" : "Take Away"} :{" "}
              {orderType === "dine-in" ? `No.Meja ${tableNumber || "-"}` : customerName || "-"}
            </p>
          </div>

          <div className="border-b border-dashed border-[#d7deea] py-3">
            {items.length > 0 ? (
              <div className="space-y-2">
                {items.map((item, index) => (
                  <div key={item.id || index} className={index > 0 ? "mt-2 pt-2 border-t border-[#edf1f7]" : ""}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[#2b2f38]">{item.name}</p>
                        {item.note && (
                          <p className="text-[10px] text-[#6b7280] italic mt-0.5">{item.note}</p>
                        )}
                        <p className="text-[11px] text-[#7f8797]">
                          {item.quantity} x {formatPrice(item.price)}
                        </p>
                      </div>
                      <p className="text-xs font-medium text-[#2b2f38]">
                        {formatPrice(item.quantity * item.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="space-y-2 border-b border-dashed border-[#d7deea] py-3 text-[11px] text-[#7f8797]">
            <div className="flex items-center justify-between">
              <span>Sub Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Tax</span>
              <span>{formatPrice(tax)}</span>
            </div>
          </div>

          <div className="space-y-2 pt-3 text-[11px] text-[#7f8797]">
            <div className="flex items-center justify-between text-[#2b2f38]">
              <span className="text-sm">Total</span>
              <span className="text-[28px] font-semibold leading-none">{formatPrice(total)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Diterima</span>
              <span>{formatPrice(Number(amountPaid || 0))}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Kembalian</span>
              <span>{formatPrice(change)}</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="mt-5 h-11 w-full rounded-xl bg-[#3b5bdb] text-sm font-medium text-white transition-colors hover:bg-[#3552c7]"
        >
          Print Struk
        </button>
      </div>
    </div>
  );
}
