import { useStock } from "../context/StockContext";
import { formatDate } from "../constant/commonFunction";
import { useEffect, useState } from "react";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

export default function StockIn() {
  const { stockIn, handleDeleteHistory, user } = useStock();
  const [confirmDelete, setConfirmDelete] = useState(null);
  console.log("stockIn", JSON.stringify(stockIn, null, 2));
  useEffect(() => {
    // define a custom handler function
    // for the contextmenu event
    const handleContextMenu = (e) => {
      // prevent the right-click menu from appearing
      e.preventDefault();
    };

    // attach the event listener to
    // the document object
    document.addEventListener("contextmenu", handleContextMenu);

    // clean up the event listener when
    // the component unmounts
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);
  return (
    <div className="container mx-auto p-4 bg-gray-700 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-white">Stock In</h1>

      {confirmDelete && <ConfirmDeleteModal onClick={() => handleDeleteHistory(confirmDelete)} onCancel={() => setConfirmDelete(null)} />}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-600">
              <th className="border p-3 text-center border-gray-600 text-white text-sm md:text-base">Serial</th>
              <th className="border p-3 text-center border-gray-600 text-white text-sm md:text-base">Product</th>
              <th className="border p-3 text-center border-gray-600 text-white text-sm md:text-base">Quantity</th>
              <th className="border p-3 text-center border-gray-600 text-white text-sm md:text-base">Date</th>
              <th className="border p-3 text-center border-gray-600 text-white text-sm md:text-base">Updated By</th>
              {user.role === "admin" && <th className="border p-3 text-center border-gray-600 text-white text-sm md:text-base">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {stockIn.length > 0 ? (
              stockIn.map((stock, index) => (
                <tr key={stock._id} className={`hover:bg-gray-800 transition-colors bg-gray-700`}>
                  <td className="border text-center border-gray-600 text-white p-2 md:text-base">{index + 1}</td>
                  <td className="border border-gray-600 text-white p-2 md:text-base">{stock.name}</td>
                  <td className="border border-gray-600 text-white p-2 md:text-base">{stock.stockQuantity}</td>
                  <td className="border border-gray-600 text-white p-2 md:text-base">{formatDate(stock.date)}</td>
                  <td className="border border-gray-600 text-white p-3 text-center text-sm md:text-base">
                    {stock?.user?.fullName || "N/A"}
                  </td>
                  {user.role === "admin" && (
                    <td className="border border-gray-600 text-white p-2 md:text-base">
                      <button
                        disabled={!stock.productId}
                        onClick={() => setConfirmDelete(stock)}
                        className={`px-4 py-1 rounded mx-1 ${
                          !stock.productId
                            ? "bg-red-900 text-red-500 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600 text-white transition-colors"
                        }`}
                        aria-disabled={!stock.productId}
                        aria-label={`Delete ${stock.name}`}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={user.role === "admin" ? 4 : 3} className="text-center text-white p-4">
                  No stock entries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
