import CustomerForm from "./CustomerForm";
import EmptyOrderState from "./EmptyOrderState";
import OrderItemsList from "./OrderItemsList";
import OrderHeader from "./OrderHeader";
import OrderSummary from "./OrderSummary";
import OrderTypeToggle from "./OrderTypeToggle";
import PaymentSection from "./PaymentSection";
import PayBar from "./PayBar";

export default function OrderPanel({
  orderType,
  onOrderTypeChange,
  customerName,
  tableNumber,
  onCustomerNameChange,
  onTableNumberChange,
  items,
  subtotal,
  tax,
  total,
  amountPaid,
  onAmountPaidChange,
  onIncrementItem,
  onDecrementItem,
  onRemoveItem,
  onNoteChange,
  onPay,
  onHoldOrder,
  onOpenDrafts,
  draftCount,
  onEndShift,
}) {
  const hasItems = items.length > 0;
  const showPaymentSection = hasItems && total >= 85000;

  return (
    <aside className="flex min-h-[420px] w-full max-w-[360px] flex-col rounded-[26px] bg-white p-4 shadow-[0_18px_40px_rgba(15,23,42,0.05)] 2xl:max-w-[390px]">
      <OrderHeader 
        onHoldOrder={onHoldOrder}
        onOpenDrafts={onOpenDrafts}
        draftCount={draftCount}
        isHoldDisabled={!hasItems}
        onEndShift={onEndShift}
      />
      <OrderTypeToggle orderType={orderType} onChange={onOrderTypeChange} />
      <CustomerForm
        orderType={orderType}
        customerName={customerName}
        tableNumber={tableNumber}
        onCustomerNameChange={onCustomerNameChange}
        onTableNumberChange={onTableNumberChange}
      />

      {hasItems ? (
        <div className="flex min-h-0 flex-1 flex-col gap-3 py-4">
          <OrderItemsList
            items={items}
            onIncrement={onIncrementItem}
            onDecrement={onDecrementItem}
            onRemove={onRemoveItem}
            onNoteChange={onNoteChange}
          />
          <OrderSummary subtotal={subtotal} tax={tax} total={total} />
          <PaymentSection
            total={total}
            amountPaid={amountPaid}
            onAmountPaidChange={onAmountPaidChange}
            quickAmounts={[50000, 75000, 100000]}
            isVisible={showPaymentSection}
          />
        </div>
      ) : (
        <EmptyOrderState />
      )}

      <PayBar disabled={!hasItems} onClick={onPay} />
    </aside>
  );
}
