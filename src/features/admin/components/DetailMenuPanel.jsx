import PropTypes from "prop-types";

/**
 * DetailMenuPanel - Panel untuk menampilkan detail menu
 * Menampilkan informasi menu dengan tombol edit dan delete di header
 */
export default function DetailMenuPanel({ menu, onEdit, onDelete }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getCategoryLabel = (category) => {
    const labels = {
      food: "Food",
      beverage: "Beverage",
      dessert: "Dessert",
    };
    return labels[category?.toLowerCase()] || category;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-5 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-[#111827]">Detail Menu</h2>
        <div className="flex gap-2">
          {/* Delete Button */}
          <button
            onClick={onDelete}
            className="border border-red-500 text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
            aria-label="Delete menu"
          >
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
          
          {/* Edit Button */}
          <button
            onClick={onEdit}
            className="border border-yellow-500 text-yellow-500 px-3 py-1.5 rounded-lg hover:bg-yellow-50 transition-colors"
            aria-label="Edit menu"
          >
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
          </button>
        </div>
      </div>

      {/* Menu Detail */}
      <div className="flex-1 overflow-y-auto">
        {/* Image */}
        <img
          src={menu.image || "/placeholder-food.jpg"}
          alt={menu.name}
          className="w-full h-48 object-cover rounded-lg mb-5"
        />

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#111827] mb-1">
            Name
          </label>
          <div className="px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm text-[#111827]">
            {menu.name}
          </div>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#111827] mb-1">
            Category
          </label>
          <div className="px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm text-[#111827]">
            {getCategoryLabel(menu.category)}
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#111827] mb-1">
            Price
          </label>
          <div className="px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm text-[#111827]">
            {formatPrice(menu.price)}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-[#111827] mb-1">
            Description
          </label>
          <div className="px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm text-[#111827] min-h-[80px]">
            {menu.description}
          </div>
        </div>
      </div>
    </div>
  );
}

DetailMenuPanel.propTypes = {
  menu: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    category: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
