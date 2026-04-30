import { useState, useEffect } from "react";
import { menuService } from "../../shared/services/menu.service";

export default function LowStockWidget() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLowStock = async () => {
      try {
        setIsLoading(true);
        const data = await menuService.getLowStock(5);
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch low stock", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLowStock();
  }, []);

  if (!isLoading && items.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-red-100 shadow-sm overflow-hidden">
      <div className="bg-red-50 px-6 py-4 border-b border-red-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-red-500 rounded-lg text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="font-bold text-red-900">Stok Menipis</h2>
        </div>
        <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded-full uppercase">
          {items.length} Item
        </span>
      </div>

      <div className="p-4 max-h-[300px] overflow-auto">
        <div className="space-y-3">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-12 bg-gray-50 animate-pulse rounded-xl"></div>
            ))
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border border-gray-50 rounded-xl hover:bg-red-50/30 transition-colors">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">{item.name}</h3>
                  <p className="text-[10px] text-gray-500 uppercase font-medium">{item.category?.label || 'General'}</p>
                </div>
                <div className="flex items-center gap-3">
                   <div className="text-right">
                      <p className="text-xs font-bold text-red-600">{item.stock} Tersisa</p>
                   </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
