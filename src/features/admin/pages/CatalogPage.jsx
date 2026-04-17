import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MenuCard from "../components/MenuCard";
import CategoryFilter from "../components/CategoryFilter";
import AddMenuForm from "../components/AddMenuForm";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import DetailMenuPanel from "../components/DetailMenuPanel";
import { useMenuAPI } from "../models/menu.model";
import { useCategoryModel } from "../../shared/models/category.model";
import { MenuGridSkeleton } from "../../shared/components/MenuSkeleton";
import useToastStore from "../../../stores/useToastStore";

/**
 * CatalogPage - Halaman utama untuk mengelola menu/catalog
 * Fitur:
 * - List menu dalam grid view
 * - Filter berdasarkan kategori
 * - Tambah menu baru
 * - Edit menu existing
 * - Toast notification
 */
export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [menuToDelete, setMenuToDelete] = useState(null);
  const [filteredMenus, setFilteredMenus] = useState([]);
  
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get("search") || "";
  
  const { categories: backendCategories, isLoading: isCatsLoading } = useCategoryModel();
  const categories = [{ id: "all", label: "All Menu" }, ...backendCategories];

  const { menus, loading, fetchMenus, addMenu, updateMenu, deleteMenu } = useMenuAPI();
  const showToast = useToastStore((s) => s.showToast);

  // Fetch menus when category or search changes
  useEffect(() => {
    const loadMenus = async () => {
      try {
        const selectedCat = categories.find((c) => c.id === activeCategory);
        const result = await fetchMenus(selectedCat?.dbId || "all", searchKeyword);
        setFilteredMenus(result);
      } catch (error) {
        showToast("Failed to load menus", "error");
      }
    };
    loadMenus();
  }, [activeCategory, searchKeyword, fetchMenus, showToast, categories.length]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleSelectMenu = (menu) => {
    setSelectedMenu(menu);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    if (selectedMenu) {
      setMenuToDelete(selectedMenu);
      setShowDeleteModal(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (menuToDelete) {
      try {
        await deleteMenu(menuToDelete.id);
        showToast("Menu successfully deleted!", "success");
        // Refresh menu list
        const result = await fetchMenus(activeCategory);
        setFilteredMenus(result);
      } catch (error) {
        showToast("Failed to delete menu", "error");
      }
    }
    setShowDeleteModal(false);
    setMenuToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setMenuToDelete(null);
  };

  const handleAddNew = () => {
    setSelectedMenu(null);
    setIsEditing(false);
  };

  const handleCancelForm = () => {
    setIsEditing(false);
  };

  const handleSaveMenu = async (menuData) => {
    try {
      if (selectedMenu && isEditing) {
        await updateMenu(selectedMenu.id, menuData);
        showToast("Menu successfully updated!", "success");
        // Update selected menu with new data
        const updatedMenu = { ...selectedMenu, ...menuData };
        setSelectedMenu(updatedMenu);
        setIsEditing(false);
      } else {
        await addMenu(menuData);
        showToast("New menu successfully added!", "success");
      }
      
      // Refresh menu list
      const result = await fetchMenus(activeCategory);
      setFilteredMenus(result);
    } catch (error) {
      showToast(isEditing ? "Failed to update menu" : "Failed to add menu", "error");
    }
  };

  return (
    <div className="flex w-full h-full gap-5">
      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        itemName={menuToDelete?.name}
      />

      {/* Left Section - Menu List */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-2xl font-bold text-[#111827]">List Menu</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#6b7280]">Total:</span>
            <span className="text-sm font-semibold text-[#111827]">
              {filteredMenus.length} Menu
            </span>
          </div>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          activeCategory={activeCategory}
          categories={categories}
          onCategoryChange={handleCategoryChange}
        />

        {/* Menu Grid */}
        {loading ? (
          <div className="flex-1 overflow-y-auto">
            <MenuGridSkeleton count={8} />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            {filteredMenus.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredMenus.map((menu) => (
                  <MenuCard
                    key={menu.id}
                    menu={menu}
                    isSelected={selectedMenu?.id === menu.id}
                    onSelect={handleSelectMenu}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-[#6b7280]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <p className="text-lg font-medium">No menus found</p>
                <p className="text-sm">Try changing the category or add a new menu</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Section - Detail/Edit Form */}
      <div className="w-[400px] flex-shrink-0">
        {selectedMenu ? (
          isEditing ? (
            <AddMenuForm
              menu={selectedMenu}
              onSave={handleSaveMenu}
              onCancel={handleCancelForm}
            />
          ) : (
            <DetailMenuPanel
              menu={selectedMenu}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          )
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-5 h-full flex flex-col items-center justify-center text-[#6b7280]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <p className="text-lg font-medium mb-4">Add Menu here</p>
            <button
              onClick={handleAddNew}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add Menu
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
