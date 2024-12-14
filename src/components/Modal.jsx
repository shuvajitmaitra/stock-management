import { useState } from "react";
import Select from "react-select";
import { useStock } from "../context/StockContext";

export default function Modal() {
  const [formData, setFormData] = useState({});

  const { products, handleStockUpdate, setSTUVisible } = useStock();

  const handleChange = (e) => {
    setFormData({ ...formData, stockQuantity: parseInt(e.target.value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = {
      ...formData,
      stockQuantity: parseInt(formData.stockQuantity),
    };
    handleStockUpdate(updatedProduct);
    setSTUVisible(false);
  };

  const productOptions = products.map((item) => ({
    label: item.name,
    value: item._id,
    stockQuantity: item.stockQuantity,
  }));

  const typeOptions = [
    { label: "Stock In", value: "in" },
    { label: "Stock Out", value: "out" },
  ];

  const selectedProduct = productOptions.find((option) => option.value === formData._id);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-lg font-bold mb-4">{"Stock Update"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <Select
              inputId="name"
              name="name"
              value={selectedProduct || null} // Show the selected product object
              onChange={(selectedOption) =>
                setFormData((pre) => ({
                  ...pre,
                  name: selectedOption.label,
                  _id: selectedOption.value,
                  stockQuantity: selectedOption.stockQuantity,
                }))
              }
              options={productOptions}
              isSearchable
              placeholder="Select or type product name" // Ensure placeholder is visible when no selection
            />
          </div>

          <div className="mb-2">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Select stock in or stock out
            </label>
            <Select
              inputId="type"
              name="type"
              value={typeOptions.find((option) => option.value === formData.type) || null}
              onChange={(opt) => setFormData((pre) => ({ ...pre, type: opt.value }))}
              options={typeOptions}
              isSearchable
              placeholder="Select stock in or stock out"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              name="stockQuantity"
              value={formData.stockQuantity}
              placeholder="Quantity"
              className="border p-2 w-full"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
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
