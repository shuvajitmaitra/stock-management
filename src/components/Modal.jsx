import { useState } from "react";
import Select from "react-select";
import { useStock } from "../context/StockContext";

export default function Modal() {
  const { products, handleStockUpdate, setSTUVisible, user } = useStock();
  const [formData, setFormData] = useState({ type: user.role !== "admin" ? "out" : "", stockQuantity: 0 });

  const handleChange = (e) => {
    setFormData({ ...formData, stockQuantity: parseInt(e?.target?.value) });
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    const updatedProduct = {
      ...formData,
      stockQuantity: parseInt(formData?.stockQuantity),
    };
    handleStockUpdate(updatedProduct);
    setSTUVisible(false);
  };

  const productOptions = products?.map((item) => ({
    label: item?.name,
    value: item?._id,
    stockQuantity: item?.stockQuantity,
  }));

  const typeOptions = [
    { label: "Stock In", value: "in" },
    { label: "Stock Out", value: "out" },
  ];

  const selectedProduct = productOptions?.find((option) => option?.value === formData?._id);

  // Define custom styles
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state?.isFocused ? "#4B5563" : "#374151", // Example colors
      borderColor: state?.isFocused ? "#3B82F6" : "#6B7280",
      boxShadow: state?.isFocused ? "0 0 0 1px #3B82F6" : "none",
      "&:hover": {
        borderColor: "#3B82F6",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#374151",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state?.isSelected ? "#3B82F6" : state?.isFocused ? "#4B5563" : "#374151",
      color: "#FFFFFF",
      "&:hover": {
        backgroundColor: "#4B5563",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#FFFFFF",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9CA3AF",
    }),
  };
  const invalid = formData?.type === "out" && selectedProduct?.stockQuantity - formData?.stockQuantity < 0;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded w-96">
        <h2 className="text-lg font-bold mb-4 text-white">{user?.role === "admin" ? "Stock Update" : "Stock Out"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-500 mb-1">
              Product Name
            </label>
            <Select
              inputId="name"
              name="name"
              value={selectedProduct || null} // Show the selected product object
              onChange={(selectedOption) =>
                setFormData((pre) => ({
                  ...pre,
                  name: selectedOption?.label,
                  _id: selectedOption?.value,
                }))
              }
              options={productOptions}
              isSearchable
              placeholder="Select or type product name"
              styles={customStyles} // Apply custom styles
            />
          </div>

          {user?.role === "admin" && (
            <div className="mb-2">
              <label htmlFor="type" className="block text-sm font-medium text-gray-500 mb-1">
                Select stock in or stock out
              </label>
              <Select
                inputId="type"
                name="type"
                value={typeOptions?.find((option) => option?.value === formData?.type) || null}
                onChange={(opt) => setFormData((pre) => ({ ...pre, type: opt?.value }))}
                options={typeOptions}
                isSearchable
                placeholder="Select stock in or stock out"
                styles={customStyles}
                required
              />
            </div>
          )}

          <div className="mb-2">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-500 mb-1">
              Quantity
            </label>
            <input
              type="number"
              name="stockQuantity"
              value={formData?.stockQuantity || ""}
              placeholder="Quantity"
              className={`border text-gray-300 p-2 w-full rounded bg-gray-700 ${invalid ? "bg-red-500 bg-opacity-30" : "border-gray-500"}`}
              onChange={handleChange}
              required
            />
          </div>

          {invalid && (
            <p className="text-red-500">
              {formData?.type === "out" &&
                selectedProduct?.stockQuantity - formData?.stockQuantity &&
                "Quantity can not be more than stock"}
            </p>
          )}

          <button
            disabled={!formData.stockQuantity || invalid}
            type="submit"
            className={`px-4 py-2 ${!formData.stockQuantity || invalid ? "bg-blue-900" : "bg-blue-500"} text-white rounded`}
          >
            Submit
          </button>

          <button type="button" className="px-4 py-2 bg-gray-500 text-white rounded ml-2" onClick={() => setSTUVisible(false)}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
