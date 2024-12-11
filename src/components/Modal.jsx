import React, { useState, useEffect } from "react";

export default function Modal({ type, onSubmit, onClose, defaultValues }) {
  const [formData, setFormData] = useState({ product: "", quantity: "", date: "" });

  useEffect(() => {
    if (defaultValues) {
      setFormData(defaultValues);
    }
  }, [defaultValues]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-lg font-bold mb-4">{type === "in" ? "Add/Edit Stock In" : "Add/Edit Stock Out"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="product"
            value={formData.product}
            placeholder="Product Name"
            className="border p-2 w-full mb-2"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            placeholder="Quantity"
            className="border p-2 w-full mb-2"
            onChange={handleChange}
            required
          />
          <input type="date" name="date" value={formData.date} className="border p-2 w-full mb-4" onChange={handleChange} required />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Submit
          </button>
          <button type="button" className="px-4 py-2 bg-gray-500 text-white rounded ml-2" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
