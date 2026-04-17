import PropTypes from "prop-types";

/**
 * CategoryFilter - Component untuk filter menu berdasarkan kategori
 */
const defaultIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
    />
  </svg>
);

/**
 * CategoryFilter - Component untuk filter menu berdasarkan kategori
 */
export default function CategoryFilter({ activeCategory, categories, onCategoryChange }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      {categories.map((category) => {
        const isActive = activeCategory === category.id;
        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
              isActive
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-[#6b7280] border border-[#e5e7eb] hover:border-blue-300 hover:bg-blue-50"
            }`}
          >
            {defaultIcon}
            <span>{category.label}</span>
          </button>
        );
      })}
    </div>
  );
}

CategoryFilter.propTypes = {
  activeCategory: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string
  })).isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};
