import MenuGrid from "./MenuGrid";

export default function MenuSection({ menus, totalMenus, onSelectMenu }) {
  return (
    <section className="flex min-h-0 flex-1 flex-col rounded-[26px] bg-white px-4 py-4 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[28px] font-semibold text-[#111827]">List Menu</h2>
        <p className="text-sm text-[#9ca3af]">
          Total <span className="font-medium text-[#4b5563]">{totalMenus} Menu</span>
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        <MenuGrid menus={menus} onSelectMenu={onSelectMenu} />
      </div>
    </section>
  );
}
