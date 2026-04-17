const categoryIcons = {
  all: null,
  foods: (
    <path
      d="M8 6.5h8l1.5 4v7a1 1 0 01-1 1h-9a1 1 0 01-1-1v-7L8 6.5zM10 6.5V5a2 2 0 114 0v1.5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  ),
  beverages: (
    <>
      <path
        d="M8 7.5h8a0 0 0 010 0v4a4 4 0 01-4 4h0a4 4 0 01-4-4v-4a0 0 0 010 0z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M16 8h1.5A2.5 2.5 0 0120 10.5 2.5 2.5 0 0117.5 13H16M10 4.5v2M14 4.5v2"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </>
  ),
  dessert: (
    <>
      <path
        d="M7 9.5h10v8H7zM9 9.5v-2a1 1 0 011-1h4a1 1 0 011 1v2"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path d="M12 5v2" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </>
  ),
  default: (
    <path
      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  ),
};

export default function CategoryTabs({ categories, activeCategory, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      {categories.map((category) => {
        const isActive = category.id === activeCategory;

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onChange(category.id)}
            className={`flex h-14 items-center justify-center gap-2 rounded-2xl border text-lg transition-all ${
              isActive
                ? "border-[#3b5bdb] bg-[#3b5bdb] font-medium text-white shadow-[0_14px_22px_rgba(59,91,219,0.2)]"
                : "border-[#dde3ee] bg-white text-[#959eaf] hover:border-[#b7c4e4] hover:text-[#4b5565]"
            }`}
          >
            {categoryIcons[category.id] || categoryIcons.default ? (
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                {categoryIcons[category.id] || categoryIcons.default}
              </svg>
            ) : null}
            <span className="text-base">{category.label}</span>
          </button>
        );
      })}
    </div>
  );
}
