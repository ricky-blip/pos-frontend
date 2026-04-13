import PropTypes from "prop-types";

/**
 * DeleteConfirmModal - Modal konfirmasi untuk menghapus item
 */
export default function DeleteConfirmModal({ isOpen, onCancel, onConfirm, itemName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm mx-4 animate-scale-in">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-red-600"
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
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-[#111827] text-center mb-2">
          Are you sure want to delete this file?
        </h2>

        {itemName && (
          <p className="text-sm text-[#6b7280] text-center mb-6">
            "{itemName}"
          </p>
        )}

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 border border-[#e5e7eb] text-[#111827] rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

DeleteConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  itemName: PropTypes.string,
};

DeleteConfirmModal.defaultProps = {
  itemName: "",
};
