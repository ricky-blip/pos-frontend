import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useCategoryModel } from "../../shared/models/category.model";
import useToastStore from "../../../stores/useToastStore";

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      <line x1="10" y1="11" x2="10" y2="17"></line>
      <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
  );
}

export default function CategoryManagementModal({ isOpen, onClose }) {
  const { categories, isLoading, addCategory, updateCategory, deleteCategory } = useCategoryModel();
  const showToast = useToastStore((state) => state.showToast);

  const [isAdding, setIsAdding] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newSlug, setNewSlug] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editLabel, setEditLabel] = useState("");
  const [editSlug, setEditSlug] = useState("");

  if (!isOpen) return null;

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!newLabel || !newSlug) return;
    try {
      await addCategory({ label: newLabel, slug: newSlug });
      showToast("Category added successfully!", "success");
      setNewLabel("");
      setNewSlug("");
      setIsAdding(false);
    } catch (error) {
      showToast(error.message || "Failed to add category", "error");
    }
  };

  const handleEditClick = (cat) => {
    setEditingId(cat.dbId);
    setEditLabel(cat.label);
    setEditSlug(cat.id);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editLabel || !editSlug) return;
    try {
      await updateCategory(editingId, { label: editLabel, slug: editSlug });
      showToast("Category updated successfully!", "success");
      setEditingId(null);
    } catch (error) {
      showToast(error.message || "Failed to update category", "error");
    }
  };

  const handleDeleteClick = async (dbId, label) => {
    if (window.confirm(`Are you sure you want to delete "${label}"?`)) {
      try {
        await deleteCategory(dbId);
        showToast("Category deleted successfully!", "success");
      } catch (error) {
        showToast(error.message || "Failed to delete category", "error");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl animate-scale-in max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between shrink-0">
          <h2 className="text-xl font-bold text-[#111827]">Manage Categories</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-[#6b7280] transition-colors hover:bg-gray-100"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Add Button */}
        <div className="mb-4 shrink-0 flex justify-end">
          {!isAdding && (
            <button
              onClick={() => setIsAdding(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
            >
              + Add Category
            </button>
          )}
        </div>

        {/* Form Add */}
        {isAdding && (
          <form onSubmit={handleAddSubmit} className="mb-6 bg-gray-50 p-4 rounded-xl border border-gray-200 shrink-0">
            <h3 className="text-sm font-semibold mb-3">Add New Category</h3>
            <div className="flex gap-4 mb-3">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Label</label>
                <input
                  type="text"
                  required
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  placeholder="e.g. Snacks"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Slug (ID)</label>
                <input
                  type="text"
                  required
                  value={newSlug}
                  onChange={(e) => setNewSlug(e.target.value)}
                  placeholder="e.g. snacks"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                Save
              </button>
            </div>
          </form>
        )}

        {/* List */}
        <div className="flex-1 overflow-y-auto border border-gray-200 rounded-xl">
          <table className="w-full text-left">
            <thead className="sticky top-0 bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Label</th>
                <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Slug</th>
                <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {isLoading && categories.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-5 py-8 text-center text-sm text-gray-500">Loading...</td>
                </tr>
              ) : categories.length > 0 ? (
                categories.map((cat) => (
                  <tr key={cat.dbId} className="hover:bg-blue-50/30 transition-colors">
                    {editingId === cat.dbId ? (
                      <td colSpan="3" className="px-5 py-3">
                        <form onSubmit={handleEditSubmit} className="flex items-center gap-4">
                          <input
                            type="text"
                            required
                            value={editLabel}
                            onChange={(e) => setEditLabel(e.target.value)}
                            className="flex-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
                          />
                          <input
                            type="text"
                            required
                            value={editSlug}
                            onChange={(e) => setEditSlug(e.target.value)}
                            className="flex-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
                          />
                          <div className="flex items-center gap-2">
                            <button
                              type="submit"
                              disabled={isLoading}
                              className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-md hover:bg-blue-700 disabled:opacity-50"
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingId(null)}
                              className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-md hover:bg-gray-200"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </td>
                    ) : (
                      <>
                        <td className="px-5 py-4 text-sm font-medium text-gray-900">{cat.label}</td>
                        <td className="px-5 py-4 text-sm text-gray-500">{cat.id}</td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleEditClick(cat)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                              title="Edit"
                            >
                              <EditIcon />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(cat.dbId, cat.label)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                              title="Delete"
                            >
                              <DeleteIcon />
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-5 py-8 text-center text-sm text-gray-500">No categories found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

CategoryManagementModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
