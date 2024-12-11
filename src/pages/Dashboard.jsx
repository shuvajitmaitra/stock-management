import React, { useState } from "react";
import { useStock } from "../context/StockContext";
import Modal from "../components/Modal";

export default function Dashboard() {
  const { stockIn, stockOut, addStockIn, addStockOut } = useStock();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("in");

  const handleAdd = (data) => {
    modalType === "in" ? addStockIn(data) : addStockOut(data);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => {
            setModalType("in");
            setShowModal(true);
          }}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Add Stock In
        </button>
        <button
          onClick={() => {
            setModalType("out");
            setShowModal(true);
          }}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Add Stock Out
        </button>
      </div>
      {showModal && <Modal type={modalType} onSubmit={handleAdd} onClose={() => setShowModal(false)} />}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Type</th>
            <th className="border p-2">Product</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {[...stockIn.map((item) => ({ ...item, type: "In" })), ...stockOut.map((item) => ({ ...item, type: "Out" }))].map(
            (item, index) => (
              <tr key={index}>
                <td className="border p-2">{item.type}</td>
                <td className="border p-2">{item.product}</td>
                <td className="border p-2">{item.quantity}</td>
                <td className="border p-2">{item.date}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
