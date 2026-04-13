import PropTypes from "prop-types";

/**
 * MenuCard - Component untuk menampilkan satu item menu
 * Menampilkan gambar, nama, deskripsi, harga, dan kategori menu
 */
export default function MenuCard({ menu, isSelected, onSelect }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getCategoryBadgeStyle = (category) => {
    const baseStyle =
      "absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold text-white";
    switch (category?.toLowerCase()) {
      case "food":
        return `${baseStyle} bg-blue-500`;
      case "beverage":
        return `${baseStyle} bg-green-500`;
      case "dessert":
        return `${baseStyle} bg-purple-500`;
      default:
        return `${baseStyle} bg-gray-500`;
    }
  };

  return (
    <div
      onClick={() => onSelect(menu)}
      className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer ${
        isSelected ? "ring-2 ring-blue-600" : ""
      }`}
    >
      {/* Image Container */}
      <div className="relative">
        <img
          src={menu.image || "/placeholder-food.jpg"}
          alt={menu.name}
          className="w-full h-40 object-cover"
        />
        {/* Category Badge */}
        <span className={getCategoryBadgeStyle(menu.category)}>{menu.category}</span>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="font-bold text-[#111827] text-sm mb-1 line-clamp-1">
          {menu.name}
        </h3>
        <p className="text-xs text-[#6b7280] mb-2 line-clamp-2">
          {menu.description}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-blue-600 font-bold text-sm">
              {formatPrice(menu.price)}
            </span>
            <span className="text-xs text-[#6b7280]">/portion</span>
          </div>
          <div className="text-[#6b7280]">
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

MenuCard.propTypes = {
  menu: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    category: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func,
};

MenuCard.defaultProps = {
  isSelected: false,
  onSelect: () => {},
};
