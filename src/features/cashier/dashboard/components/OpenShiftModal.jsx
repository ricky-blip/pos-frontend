import { useState } from "react";
import { shiftService } from "../../services/shift.service";
import useToastStore from "../../../../stores/useToastStore";

export default function OpenShiftModal({ isOpen, onOpenSuccess }) {
  const [startingCash, setStartingCash] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const showToast = useToastStore((s) => s.showToast);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!startingCash || isNaN(startingCash)) {
      showToast("Masukkan saldo awal yang valid", "error");
      return;
    }

    try {
      setIsSubmitting(true);
      const shift = await shiftService.startShift(parseFloat(startingCash));
      showToast("Shift berhasil dibuka!", "success");
      onOpenSuccess(shift);
    } catch (error) {
      showToast(error.message || "Gagal membuka shift", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="bg-white rounded-[32px] w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-10 text-center">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Buka Shift</h2>
          <p className="text-gray-500 mb-8">Selamat bekerja! Harap masukkan saldo awal laci kasir untuk memulai transaksi hari ini.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-left">
              <label className="block text-sm font-bold text-gray-700 mb-2 px-1">Saldo Awal (Rp)</label>
              <div className="relative">
                 <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">Rp</span>
                 <input
                   type="number"
                   required
                   value={startingCash}
                   onChange={(e) => setStartingCash(e.target.value)}
                   className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-xl font-bold focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                   placeholder="0"
                   autoFocus
                 />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 disabled:opacity-70 flex items-center justify-center gap-2 text-lg"
            >
              {isSubmitting && <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>}
              Mulai Bekerja
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
