import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useCategoryModel } from "../../shared/models/category.model";

/**
 * AddMenuForm - Form untuk menambah atau mengedit menu
 * Supports image upload, form validation, and submit handling
 */
export default function AddMenuForm({ menu, onSave, onCancel }) {
  const { categories, isLoading: isCatsLoading } = useCategoryModel();

  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    price: "",
    unit: "portion", // Default unit
    description: "",
    stock: "0",
    is_available: true,
    image: null,
    imagePreview: null,
  });
  const [errors, setErrors] = useState({});
  const [isDragging, setIsDragging] = useState(false);

  // Populate form when editing existing menu
  useEffect(() => {
    if (menu) {
      setFormData({
        name: menu.name || "",
        categoryId: menu.categoryId?.toString() || "",
        price: menu.price?.toString() || "",
        unit: menu.unit || "portion",
        description: menu.description || "",
        stock: menu.stock?.toString() || "0",
        is_available: menu.is_available ?? true,
        image: null,
        imagePreview: menu.image || null,
      });
    }
  }, [menu]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file) => {
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, image: "Please upload an image file" }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        image: "File size must be less than 5MB",
      }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image: file,
        imagePreview: reader.result,
      }));
      setErrors((prev) => ({ ...prev, image: "" }));
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.categoryId) newErrors.categoryId = "Category is required";
    if (!formData.price) newErrors.price = "Price is required";
    else if (isNaN(formData.price) || Number(formData.price) <= 0)
      newErrors.price = "Price must be a positive number";
    if (!formData.unit) newErrors.unit = "Unit is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (formData.stock === "" || isNaN(formData.stock) || Number(formData.stock) < 0)
      newErrors.stock = "Stock must be a non-negative number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave({
        ...formData,
        categoryId: Number(formData.categoryId),
        price: Number(formData.price),
        stock: Number(formData.stock),
        is_available: formData.is_available,
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-5 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-[#111827]">
          {menu ? "Edit Menu" : "Add Menu"}
        </h2>
        {onCancel && (
          <button
            onClick={onCancel}
            className="text-[#6b7280] hover:text-[#111827] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Image Upload */}
        <div>
          {formData.imagePreview ? (
            <div>
              <img
                src={formData.imagePreview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
              <label className="inline-block mt-3">
                <span className="border border-blue-600 text-blue-600 px-4 py-1.5 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors text-sm font-medium">
                  Change Photo
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          ) : (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-[#e5e7eb] hover:border-blue-300"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto text-[#6b7280] mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="text-sm text-[#6b7280] mb-2">
                Drag and Drop your file here or
              </p>
              <label className="inline-block">
                <span className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors text-sm">
                  Choose File
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              {errors.image && (
                <p className="text-red-500 text-xs mt-2">{errors.image}</p>
              )}
            </div>
          )}
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-[#111827] mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name here..."
            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? "border-red-500" : "border-[#e5e7eb]"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-[#111827] mb-1">
            Category
          </label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            disabled={isCatsLoading}
            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.categoryId ? "border-red-500" : "border-[#e5e7eb]"
            }`}
          >
            <option value="">{isCatsLoading ? "Memuat Kategori..." : "Select category"}</option>
            {categories.map((cat) => (
              <option key={cat.dbId} value={cat.dbId}>
                {cat.label}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="text-red-500 text-xs mt-1">{errors.categoryId}</p>
          )}
        </div>

        {/* Unit */}
        <div>
          <label className="block text-sm font-medium text-[#111827] mb-1">
            Unit
          </label>
          <select
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.unit ? "border-red-500" : "border-[#e5e7eb]"
            }`}
          >
            <option value="portion">Portion</option>
            <option value="plate">Plate</option>
            <option value="bowl">Bowl</option>
            <option value="glass">Glass</option>
            <option value="cup">Cup</option>
            <option value="slice">Slice</option>
          </select>
          {errors.unit && (
            <p className="text-red-500 text-xs mt-1">{errors.unit}</p>
          )}
        </div>

        {/* Price & Stock Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-1">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price..."
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.price ? "border-red-500" : "border-[#e5e7eb]"
              }`}
            />
            {errors.price && (
              <p className="text-red-500 text-xs mt-1">{errors.price}</p>
            )}
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-1">
              Initial Stock
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="0"
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.stock ? "border-red-500" : "border-[#e5e7eb]"
              }`}
            />
            {errors.stock && (
              <p className="text-red-500 text-xs mt-1">{errors.stock}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-[#111827] mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Add description here..."
            rows="3"
            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
              errors.description ? "border-red-500" : "border-[#e5e7eb]"
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description}</p>
          )}
        </div>

        {/* Availability Toggle */}
        <div className="flex items-center justify-between py-2 border-t border-b border-[#f3f4f6]">
          <div>
            <p className="text-sm font-semibold text-[#111827]">Availability</p>
            <p className="text-xs text-[#6b7280]">Toggle to show/hide in cashier</p>
          </div>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, is_available: !prev.is_available }))}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
              formData.is_available ? "bg-blue-600" : "bg-[#d1d5db]"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData.is_available ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Save
        </button>
      </form>
    </div>
  );
}

AddMenuForm.propTypes = {
  menu: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    category: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    image: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

AddMenuForm.defaultProps = {
  menu: null,
  onCancel: null,
};
