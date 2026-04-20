import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryTabs from "../components/CategoryTabs";
import MenuSection from "../components/MenuSection";
import OrderPanel from "../components/OrderPanel";
import TransactionSuccessModal from "../components/TransactionSuccessModal";
import DetailMenuModal from "../components/DetailMenuModal";
import { useCashierCatalog } from "../../models/catalog.model";
import { MenuGridSkeleton } from "../../../shared/components/MenuSkeleton";
import transactionService from "../../../shared/services/transaction.service";
import useToastStore from "../../../../stores/useToastStore";

export default function CashierDashboardPage() {
  const { categories, menus, isLoading, error, fetchMenus } = useCashierCatalog();
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get("search") || "";

  const [activeCategory, setActiveCategory] = useState("all");
  const [orderType, setOrderType] = useState("dine-in");
  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [itemNotes, setItemNotes] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const showToast = useToastStore((s) => s.showToast);
  
  // State untuk Detail Menu Modal
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const filteredMenus = menus; // Now menus are always filtered from the server

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );
  
  // Align with Backend PPN 11%
  const tax = useMemo(
    () => Math.round(subtotal * 0.11),
    [subtotal]
  );
  
  const total = subtotal + tax;

  const handleSelectMenuForDetail = (menu) => {
    setSelectedMenu(menu);
    setIsDetailModalOpen(true);
  };

  const handleAddItemToCart = (menu) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === menu.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === menu.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...prev, { ...menu, quantity: 1, note: "" }];
    });
  };

  const handleIncrementItem = (id) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  const handleDecrementItem = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    setItemNotes((prev) => {
      const newNotes = { ...prev };
      delete newNotes[id];
      return newNotes;
    });
  };

  const handleNoteChange = (id, note) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, note } : item))
    );
  };

  const handleSubmitDetailMenu = (menuWithNote) => {
    // Add item to cart dengan note dari detail modal
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === menuWithNote.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === menuWithNote.id
            ? { ...item, quantity: item.quantity + 1, note: menuWithNote.note || item.note }
            : item
        );
      }
      return [...prev, { ...menuWithNote, quantity: 1 }];
    });
    handleCloseDetailModal();
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedMenu(null);
  };

  const handleOpenArchive = () => {
    setIsArchiveModalOpen(true);
  };

  const handleCloseArchive = () => {
    setIsArchiveModalOpen(false);
  };

  // Fetch menus when category or search changes
  useEffect(() => {
    const selectedCat = categories.find((c) => c.id === activeCategory);
    fetchMenus(selectedCat?.dbId || "all", searchKeyword);
  }, [activeCategory, searchKeyword, fetchMenus, categories]);

  const handleCategoryChange = (nextCategory) => {
    setActiveCategory(nextCategory);
  };

  const handleChangeOrderType = (nextType) => {
    setOrderType(nextType);
    setCustomerName("");
    setTableNumber("");
  };

  const handlePay = async () => {
    if (cartItems.length === 0) {
      showToast("Keranjang masih kosong", "error");
      return;
    }

    // Basic validation for payment amount if over a certain threshold or e-wallet
    // (Optional logic from previous state preserved but simplified)
    if (amountPaid && Number(amountPaid) < total) {
      showToast("Jumlah bayar kurang", "error");
      return;
    }

    try {
      setIsProcessing(true);
      
      const transactionData = {
        items: cartItems.map(item => ({
          menuId: item.id,
          quantity: item.quantity,
          note: item.note || ""
        })),
        paymentMethod: amountPaid ? "cash" : "e-wallet", // Defaulting based on presence of amountPaid
        customerName: customerName || "Guest",
        totalDiscount: 0 // Placeholder for now
      };

      await transactionService.createTransaction(transactionData);
      
      showToast("Transaksi Berhasil!", "success");
      setIsSuccessModalOpen(true);
    } catch (err) {
      showToast(err.message || "Gagal memproses transaksi", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    setCartItems([]);
    setAmountPaid("");
    setCustomerName("");
    setTableNumber("");
    setItemNotes({});
  };

  return (
    <>
      {/* Main Content Grid */}
      <div className="grid min-w-0 flex-1 gap-4 xl:grid-cols-[minmax(0,1fr)_360px] 2xl:grid-cols-[minmax(0,1fr)_390px]">
        <section className="flex min-w-0 flex-col gap-4">
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onChange={handleCategoryChange}
          />
          {isLoading ? (
            <div className="flex-1 overflow-y-auto pr-1">
              <MenuGridSkeleton count={12} gridClass="grid grid-cols-2 lg:grid-cols-3 gap-4" />
            </div>
          ) : error ? (
            <div className="flex flex-1 items-center justify-center rounded-2xl bg-white p-6 shadow-sm text-red-500">
              <p>{error}</p>
            </div>
          ) : (
            <MenuSection
              menus={filteredMenus}
              totalMenus={filteredMenus.length}
              onSelectMenu={handleSelectMenuForDetail}
            />
          )}
        </section>

        <OrderPanel
          orderType={orderType}
          onOrderTypeChange={handleChangeOrderType}
          customerName={customerName}
          tableNumber={tableNumber}
          onCustomerNameChange={setCustomerName}
          onTableNumberChange={setTableNumber}
          items={cartItems}
          subtotal={subtotal}
          tax={tax}
          total={total}
          amountPaid={amountPaid}
          onAmountPaidChange={setAmountPaid}
          onIncrementItem={handleIncrementItem}
          onDecrementItem={handleDecrementItem}
          onRemoveItem={handleRemoveItem}
          onNoteChange={handleNoteChange}
          onPay={handlePay}
          isProcessing={isProcessing}
        />
      </div>

      {/* Transaction Success Modal */}
      <TransactionSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleCloseSuccessModal}
        orderType={orderType}
        customerName={customerName}
        tableNumber={tableNumber}
        items={cartItems}
        subtotal={subtotal}
        tax={tax}
        total={total}
        amountPaid={amountPaid || total}
      />

      {/* Detail Menu Modal */}
      <DetailMenuModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        menu={selectedMenu}
        onSubmit={handleSubmitDetailMenu}
      />
    </>
  );
}
