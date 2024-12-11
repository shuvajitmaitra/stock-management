import React, { useState } from "react";
import { useStock } from "../context/StockContext";
import Modal from "../components/Modal";

export default function StockIn() {
  const { stockIn, editStock, deleteStock } = useStock();
  const [showModal, setShowModal] = useState(false);
  const [editingStock, setEditingStock] = useState(null);

  const handleEdit = (data) => {
    editStock(editingStock.id, "in", data);
    setShowModal(false);
    setEditingStock(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Stock In</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Product</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stockIn.map((stock) => (
            <tr key={stock.id}>
              <td className="border p-2">{stock.product}</td>
              <td className="border p-2">{stock.quantity}</td>
              <td className="border p-2">{stock.date}</td>
              <td className="border p-2">
                <button
                  onClick={() => {
                    setEditingStock(stock);
                    setShowModal(true);
                  }}
                  className="px-4 py-1 bg-blue-500 text-white rounded mx-1"
                >
                  Edit
                </button>
                <button onClick={() => deleteStock(stock.id, "in")} className="px-4 py-1 bg-red-500 text-white rounded mx-1">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <Modal
          type="in"
          onSubmit={handleEdit}
          onClose={() => {
            setShowModal(false);
            setEditingStock(null);
          }}
          defaultValues={editingStock}
        />
      )}
    </div>
  );
}
