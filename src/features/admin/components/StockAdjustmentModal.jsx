import { useState } from "react";
import { menuService } from "../../shared/services/menu.service";
import useToastStore from "../../../stores/useToastStore";

export default function StockAdjustmentModal({ isOpen, onClose, menu, onUpdate }) {
  const showToast = useToastStore((s) => s.showToast);
  const [formData, setFormData] = useState({
    type: "IN",
    quantity: 0,
    reason: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !menu) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.quantity === 0) {
      showToast("Jumlah tidak boleh nol", "error");
      return;
    }

    try {
      setIsSubmitting(true);
      // Backend expects quantity to be positive for IN, and negative if it's reduction
      // but let's make it intuitive: if user chooses ADJUSTMENT or OUT, we'll negate the quantity if it's positive.
      let finalQty = parseInt(formData.quantity);
      if (formData.type !== "IN" && finalQty > 0) {
          finalQty = -finalQty;
      }

      await menuService.adjustStock(menu.id, {
        ...formData,
        quantity: finalQty
      });
      
      showToast("Stok berhasil diperbarui", "success");
      onUpdate();
      onClose();
    } catch (error) {
      showToast(error.message || "Gagal memperbarui stok", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-[28px] w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Sesuaikan Stok</h2>
              <p className="text-sm text-gray-500">{menu.name}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Tipe Perubahan</label>
              <div className="grid grid-cols-3 gap-2">
                {["IN", "OUT", "ADJUSTMENT"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFormData({ ...formData, type: t })}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      formData.type === t
                        ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-100"
                        : "bg-white border-gray-200 text-gray-500 hover:border-blue-200"
                    }`}
                  >
                    {t === "IN" ? "Barang Masuk" : t === "OUT" ? "Barang Keluar" : "Penyesuaian"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Jumlah ({formData.type === "IN" ? "+" : "-"})
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                placeholder="Masukkan jumlah..."
              />
              <p className="mt-1 text-[11px] text-gray-400">
                Stok saat ini: <span className="font-bold">{menu.stock}</span> → Estimasi akhir: <span className="font-bold text-blue-600">
                  {formData.type === "IN" ? menu.stock + parseInt(formData.quantity || 0) : menu.stock - parseInt(formData.quantity || 0)}
                </span>
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Alasan (Opsional)</label>
              <textarea
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none"
                rows="3"
                placeholder="Contoh: Barang datang dari supplier, barang rusak, tumpah, dll..."
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-all"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isSubmitting && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>}
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
