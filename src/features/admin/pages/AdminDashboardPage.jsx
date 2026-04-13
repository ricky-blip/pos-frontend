import { useState } from "react";
import StatCard from "../components/StatCard";
import CategoryPopup from "../components/CategoryPopup";

// Icon Components
function OrdersIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RevenueIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2" />
      <path
        d="M15 15l3 3M9 6v6l3 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuOrdersIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
      <path
        d="M9 8h6M9 12h6M9 16h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FoodIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BeverageIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M8 2h8l-1 14H9L8 2zM6 18h12v2H6v-2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 6h4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DessertIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3c-1.5 0-3 1-3 3s1.5 3 3 3 3-1 3-3-1.5-3-3-3zM5 10h14v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 16h8M8 19h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
      <path
        d="M16 2v4M8 2v4M3 10h18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * AdminDashboardPage - Main dashboard page for admin role
 */
export default function AdminDashboardPage() {
  // Modal states
  const [foodsModalOpen, setFoodsModalOpen] = useState(false);
  const [beveragesModalOpen, setBeveragesModalOpen] = useState(false);
  const [dessertsModalOpen, setDessertsModalOpen] = useState(false);

  // Sample data for menu items
  const foodsData = [
    { name: "Gado-gado Spesial", sales: 10 },
    { name: "Ketoprak", sales: 5 },
    { name: "Siomay", sales: 3 },
    { name: "Batagor", sales: 2 },
    { name: "Bakso", sales: 2 },
    { name: "Mie Ayam", sales: 2 },
    { name: "Soto Ayam", sales: 1 },
    { name: "Soto Sapi", sales: 0 },
  ];

  const beveragesData = [
    { name: "Ice Tea", sales: 10 },
    { name: "Coffee", sales: 5 },
    { name: "Matcha Latte", sales: 3 },
    { name: "Milkshake", sales: 2 },
    { name: "Juice", sales: 2 },
    { name: "Ice Chocolate", sales: 2 },
    { name: "Soda", sales: 1 },
    { name: "Mineral Water", sales: 0 },
  ];

  const dessertsData = [
    { name: "Ice Cream", sales: 10 },
    { name: "Smoothie", sales: 5 },
    { name: "Waffle", sales: 3 },
    { name: "Donut", sales: 2 },
    { name: "Tiramisu", sales: 2 },
    { name: "Brownies", sales: 2 },
    { name: "Pancake", sales: 1 },
    { name: "Pudding", sales: 0 },
  ];

  // Sample chart data
  const chartData = [
    { day: "Mon", food: 18, beverage: 145, dessert: 12 },
    { day: "Tue", food: 26, beverage: 92, dessert: 5 },
    { day: "Wed", food: 45, beverage: 242, dessert: 12 },
    { day: "Thu", food: 68, beverage: 142, dessert: 45 },
    { day: "Fri", food: 92, beverage: 194, dessert: 5 },
    { day: "Sat", food: 45, beverage: 142, dessert: 29 },
    { day: "Sun", food: 18, beverage: 92, dessert: 5 },
    { day: "Mon", food: 45, beverage: 142, dessert: 12 },
    { day: "Tue", food: 45, beverage: 246, dessert: 12 },
    { day: "Wed", food: 14, beverage: 142, dessert: 45 },
  ];

  const maxRevenue = 250;

  return (
    <div className="flex flex-1 flex-col">
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#111827]">Dashboard</h1>
        <p className="text-sm text-[#6b7280]">
          Today, Senin 30 September 2024
        </p>
      </div>

      {/* Stats Cards */}
      <div className="mb-6 grid grid-cols-6 gap-4">
        <StatCard
          title="Total Orders"
          value="500"
          icon={<OrdersIcon />}
        />
        <StatCard
          title="Total Omzet"
          value="Rp 10.000.000"
          icon={<RevenueIcon />}
        />
        <StatCard
          title="All Menu Orders"
          value="1000"
          icon={<MenuOrdersIcon />}
        />
        <StatCard
          title="Foods"
          value="500"
          icon={<FoodIcon />}
          clickable
          onClick={() => setFoodsModalOpen(true)}
        />
        <StatCard
          title="Beverages"
          value="300"
          icon={<BeverageIcon />}
          clickable
          onClick={() => setBeveragesModalOpen(true)}
        />
        <StatCard
          title="Desserts"
          value="200"
          icon={<DessertIcon />}
          clickable
          onClick={() => setDessertsModalOpen(true)}
        />
      </div>

      {/* Revenue Chart */}
      <div className="rounded-lg border border-[#e5e7eb] bg-white p-6">
        {/* Chart Header */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-xl font-bold text-[#111827]">Total Omzet</h2>
          <div className="flex gap-3">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#9ca3af]">
                <CalendarIcon />
              </div>
              <input
                type="text"
                placeholder="Start date"
                className="h-10 w-40 rounded-lg border border-[#e5e7eb] bg-white py-2 pl-9 pr-4 text-sm text-[#111827] placeholder-[#9ca3af] focus:border-[#3b5bdb] focus:outline-none focus:ring-1 focus:ring-[#3b5bdb]"
              />
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#9ca3af]">
                <CalendarIcon />
              </div>
              <input
                type="text"
                placeholder="Finish date"
                className="h-10 w-40 rounded-lg border border-[#e5e7eb] bg-white py-2 pl-9 pr-4 text-sm text-[#111827] placeholder-[#9ca3af] focus:border-[#3b5bdb] focus:outline-none focus:ring-1 focus:ring-[#3b5bdb]"
              />
            </div>
            <div className="relative">
              <select className="h-10 w-40 appearance-none rounded-lg border border-[#e5e7eb] bg-white py-2 pl-4 pr-10 text-sm text-[#111827] focus:border-[#3b5bdb] focus:outline-none focus:ring-1 focus:ring-[#3b5bdb]">
                <option value="">Select Category</option>
                <option value="food">Food</option>
                <option value="beverage">Beverage</option>
                <option value="dessert">Dessert</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[#9ca3af]">
                <ChevronDownIcon />
              </div>
            </div>
          </div>
        </div>

        {/* Chart Area */}
        <div className="relative h-80">
          {/* Y-Axis Labels */}
          <div className="absolute left-0 top-0 flex h-full flex-col justify-between text-xs text-[#9ca3af]">
            <span>300k</span>
            <span>250k</span>
            <span>200k</span>
            <span>150k</span>
            <span>100k</span>
            <span>50k</span>
            <span>0</span>
          </div>

          {/* Chart Grid */}
          <div className="ml-12 h-full border-l border-dashed border-[#e5e7eb]">
            {/* Grid Lines */}
            <div className="absolute inset-0 ml-12">
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="absolute w-full border-t border-dashed border-[#e5e7eb]"
                  style={{ top: `${(i / 6) * 100}%` }}
                />
              ))}
            </div>

            {/* Bars */}
            <div className="relative z-10 flex h-full items-end justify-around px-4">
              {chartData.map((data, index) => (
                <div key={index} className="flex flex-col items-center gap-1">
                  <div className="flex items-end gap-1">
                    {/* Food Bar */}
                    <div
                      className="w-4 rounded-t bg-[#1e40af]"
                      style={{
                        height: `${(data.food / maxRevenue) * 100}%`,
                      }}
                    />
                    {/* Beverage Bar */}
                    <div
                      className="w-4 rounded-t bg-[#3b82f6]"
                      style={{
                        height: `${(data.beverage / maxRevenue) * 100}%`,
                      }}
                    />
                    {/* Dessert Bar */}
                    <div
                      className="w-4 rounded-t bg-[#93c5fd]"
                      style={{
                        height: `${(data.dessert / maxRevenue) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs text-[#6b7280]">{data.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex justify-center gap-8">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-[#1e40af]" />
            <span className="text-sm text-[#6b7280]">Food</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-[#3b82f6]" />
            <span className="text-sm text-[#6b7280]">Beverage</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-[#93c5fd]" />
            <span className="text-sm text-[#6b7280]">Dessert</span>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CategoryPopup
        isOpen={foodsModalOpen}
        onClose={() => setFoodsModalOpen(false)}
        title="Foods"
        items={foodsData}
        searchPlaceholder="Enter the keyword here..."
      />
      <CategoryPopup
        isOpen={beveragesModalOpen}
        onClose={() => setBeveragesModalOpen(false)}
        title="Beverages"
        items={beveragesData}
        searchPlaceholder="Enter the keyword here..."
      />
      <CategoryPopup
        isOpen={dessertsModalOpen}
        onClose={() => setDessertsModalOpen(false)}
        title="Desserts"
        items={dessertsData}
        searchPlaceholder="Enter the keyword here..."
      />
    </div>
  );
}
