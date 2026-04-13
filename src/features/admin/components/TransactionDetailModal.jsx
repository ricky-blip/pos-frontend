import { useState } from "react";
import PropTypes from "prop-types";

/**
 * TransactionDetailModal - Modal untuk menampilkan detail transaksi
 */
export default function TransactionDetailModal({ isOpen, onClose, transaction }) {
  if (!isOpen || !transaction) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#e5e7eb]">
          <h2 className="text-2xl font-bold text-[#111827]">Transaction Detail</h2>
          <button
            onClick={onClose}
            className="text-[#6b7280] hover:text-[#111827] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="bg-gray-50 rounded-lg p-4">
            {/* Order Info */}
            <div className="space-y-1 mb-4">
              <p className="text-xs text-[#6b7280]">
                <span className="font-medium">No Order</span> {transaction.orderNumber}
              </p>
              <p className="text-xs text-[#6b7280]">
                <span className="font-medium">Order Date:</span> {formatDate(transaction.orderDate)}
              </p>
              <p className="text-xs text-[#6b7280]">
                <span className="font-medium">Customer Name:</span> {transaction.customerName}
              </p>
              <p className="text-xs text-[#6b7280] font-semibold">
                {transaction.orderType}
              </p>
            </div>

            {/* Items */}
            <div className="space-y-3">
              {transaction.items?.map((item, index) => (
                <div key={index}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[#111827]">{item.name}</p>
                      <p className="text-xs text-[#6b7280]">
                        {item.quantity} x {formatPrice(item.price)}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-[#111827]">
                      {formatPrice(item.quantity * item.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Subtotal */}
            <div className="border-t border-dashed border-[#d1d5db] mt-4 pt-4 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[#6b7280]">Sub Total</span>
                <span className="text-[#111827]">{formatPrice(transaction.subTotal)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#6b7280]">Tax</span>
                <span className="text-[#111827]">{formatPrice(transaction.tax)}</span>
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-dashed border-[#d1d5db] mt-4 pt-4 flex justify-between">
              <span className="text-sm font-semibold text-[#111827]">Total</span>
              <span className="text-xl font-bold text-[#111827]">
                {formatPrice(transaction.total)}
              </span>
            </div>

            {/* Payment Info */}
            <div className="mt-4 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-[#6b7280]">Diterima</span>
                <span className="text-[#111827]">{formatPrice(transaction.paid)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#6b7280]">Kembalian</span>
                <span className="text-[#111827]">{formatPrice(transaction.change)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

TransactionDetailModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  transaction: PropTypes.shape({
    orderNumber: PropTypes.string,
    orderDate: PropTypes.string,
    customerName: PropTypes.string,
    orderType: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        quantity: PropTypes.number,
        price: PropTypes.number,
      })
    ),
    subTotal: PropTypes.number,
    tax: PropTypes.number,
    total: PropTypes.number,
    paid: PropTypes.number,
    change: PropTypes.number,
  }),
};

TransactionDetailModal.defaultProps = {
  transaction: null,
};
