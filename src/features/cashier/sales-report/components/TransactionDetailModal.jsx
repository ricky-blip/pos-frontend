import { useState } from "react";

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function formatPrice(value) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

export default function TransactionDetailModal({ isOpen, onClose, order }) {
  if (!isOpen || !order) {
    return null;
  }

  const subtotal = order.total - 5000;
  const tax = 5000;
  const total = order.total;
  const amountPaid = 50000;
  const change = amountPaid - total;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/20 px-4 py-8">
      <div className="relative w-full max-w-md rounded-[22px] bg-white px-7 py-8 shadow-[0_30px_80px_rgba(15,23,42,0.25)]">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-[#6b7280] transition-colors hover:text-[#111827]"
        >
          <CloseIcon />
        </button>

        {/* Title */}
        <h2 className="mb-5 text-center text-xl font-semibold text-[#111827]">
          Transaction Detail
        </h2>

        {/* Order Info */}
        <div className="rounded-xl bg-[#f7f8fb] p-4">
          <div className="space-y-1 text-xs text-[#7f8797]">
            <p>
              <span className="font-medium">No Order:</span> {order.id}
            </p>
            <p>
              <span className="font-medium">Order Date:</span> {order.date}
            </p>
            <p>
              <span className="font-medium">Customer Name:</span> {order.customer}
            </p>
            <p>
              <span className="font-medium">{order.type}:</span>{" "}
              {order.type === "Dine-in" ? "No. Meja 02" : "Take Away"}
            </p>
          </div>

          {/* Item Details */}
          <div className="mt-4 border-t border-dashed border-[#d7deea] pt-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#2b2f38]">Gado-gado Spesial</p>
                <p className="text-[11px] text-[#7f8797]">1 x {formatPrice(20000)}</p>
              </div>
              <p className="text-xs font-medium text-[#2b2f38]">{formatPrice(20000)}</p>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-4 space-y-2 border-t border-dashed border-[#d7deea] pt-4">
            <div className="flex items-center justify-between text-xs text-[#7f8797]">
              <span>Sub Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#7f8797]">
              <span>Tax</span>
              <span>{formatPrice(tax)}</span>
            </div>
          </div>

          <div className="mt-4 border-t border-dashed border-[#d7deea] pt-4">
            <div className="flex items-center justify-between text-[#2b2f38]">
              <span className="text-base font-semibold">Total</span>
              <span className="text-2xl font-bold">{formatPrice(total)}</span>
            </div>
            <div className="mt-2 space-y-1 text-xs text-[#7f8797]">
              <div className="flex items-center justify-between">
                <span>Diterima</span>
                <span>{formatPrice(amountPaid)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Kembalian</span>
                <span>{formatPrice(change)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
