import { useState } from "react";
import { useStock } from "../context/StockContext";

export default function AddProductsModal() {
  const [formData, setFormData] = useState({ name: "", stockQuantity: "" });
  const { setAddProductVisible, handleAddProduct } = useStock();

  // useEffect(() => {
  //   if (defaultValues) {
  //     setFormData(defaultValues);
  //   }
  // }, [defaultValues]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddProduct(formData);
    setFormData({ name: "", stockQuantity: "" });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-lg font-bold mb-4">Add your product</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Product Name"
            className="border p-2 w-full mb-2"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="stockQuantity"
            value={formData.stockQuantity}
            placeholder="Quantity"
            className="border p-2 w-full mb-2"
            onChange={(e) => setFormData((pre) => ({ ...pre, stockQuantity: parseInt(e.target.value) }))}
            required
          />

          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Submit
          </button>
          <button type="button" className="px-4 py-2 bg-gray-500 text-white rounded ml-2" onClick={() => setAddProductVisible(false)}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
