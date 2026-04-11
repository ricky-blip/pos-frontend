function formatPrice(value) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

function ExternalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M14 5h5v5M10 14L19 5M19 14v4a1 1 0 01-1 1h-12a1 1 0 01-1-1V6a1 1 0 011-1h4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export default function MenuCard({ menu, onSelect }) {
  return (
    <article className="rounded-2xl border border-[#eef2f8] bg-white p-2 shadow-[0_10px_25px_rgba(16,24,40,0.05)]">
      <div className="relative overflow-hidden rounded-xl">
        <img src={menu.image} alt={menu.name} className="h-[104px] w-full object-cover" />
        <span className="absolute right-2 top-2 rounded-full bg-[#4b6ef2] px-3 py-1 text-[11px] text-white">
          {menu.category === "foods" ? "Food" : menu.category === "beverages" ? "Drink" : "Dessert"}
        </span>
      </div>

      <div className="px-1 pb-1 pt-3">
        <h3 className="line-clamp-1 text-[15px] font-semibold text-[#141c2d]">{menu.name}</h3>
        <p className="mt-1 min-h-[34px] text-[10px] leading-4 text-[#a0a7b5]">{menu.description}</p>

        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold text-[#3b5bdb]">{formatPrice(menu.price)}</p>
            <p className="text-[10px] text-[#b1b8c6]">/{menu.unit}</p>
          </div>

          <button
            type="button"
            onClick={() => onSelect(menu)}
            className="rounded-lg p-1 text-[#8f98a9] transition-colors hover:bg-[#eef4ff] hover:text-[#3b5bdb]"
          >
            <ExternalIcon />
          </button>
        </div>
      </div>
    </article>
  );
}
