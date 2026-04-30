import { useState } from "react";
import { shiftService } from "../../services/shift.service";
import useToastStore from "../../../../stores/useToastStore";

export default function EndShiftModal({ isOpen, onClose, onEndSuccess }) {
  const [actualEndingCash, setActualEndingCash] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const showToast = useToastStore((s) => s.showToast);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!actualEndingCash || isNaN(actualEndingCash)) {
      showToast("Masukkan saldo akhir yang valid", "error");
      return;
    }

    try {
      setIsSubmitting(true);
      const shift = await shiftService.endShift({
        actualEndingCash: parseFloat(actualEndingCash),
        notes
      });
      showToast("Shift berhasil ditutup!", "success");
      onEndSuccess(shift);
    } catch (error) {
      showToast(error.message || "Gagal menutup shift", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="bg-white rounded-[32px] w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Tutup Shift</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            Harap hitung total uang tunai (cash) yang ada di laci saat ini untuk pencocokan data sistem.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 px-1">Total Uang Fisik di Laci (Rp)</label>
              <div className="relative">
                 <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">Rp</span>
                 <input
                   type="number"
                   required
                   value={actualEndingCash}
                   onChange={(e) => setActualEndingCash(e.target.value)}
                   className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-xl font-bold focus:ring-4 focus:ring-red-500/10 focus:border-red-500 outline-none transition-all"
                   placeholder="0"
                   autoFocus
                 />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 px-1">Catatan Tambahan (Opsional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all resize-none"
                rows="3"
                placeholder="Misal: Selisih Rp 2.000 karena tidak ada kembalian..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-red-200 disabled:opacity-70 flex items-center justify-center gap-2 text-lg"
            >
              {isSubmitting && <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>}
              Tutup Shift & Keluar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
