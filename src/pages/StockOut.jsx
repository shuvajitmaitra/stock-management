import { useStock } from "../context/StockContext";
import { formatDate } from "../constant/commonFunction";

export default function StockOut() {
  const { stockOut, handleDeleteHistory, user } = useStock();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Stock Out</h1>
      <table className="w-full border text-white border-gray-600">
        <thead>
          <tr className="bg-gray-600">
            <th className=" text-center border text-white border-gray-600 p-2">Product</th>
            <th className=" text-center border text-white border-gray-600 p-2">Quantity</th>
            <th className=" text-center border text-white border-gray-600 p-2">Date</th>
            {user.role === "admin" && <th className=" text-center border text-white border-gray-600 p-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {stockOut.map((stock) => (
            <tr key={stock._id}>
              <td className="border text-white border-gray-600 p-2">{stock.name}</td>
              <td className=" text-center border text-white border-gray-600 p-2">{stock.stockQuantity}</td>
              <td className=" text-center border text-white border-gray-600 p-2">{formatDate(stock.date)}</td>
              {user.role === "admin" && (
                <td className=" text-center border text-white border-gray-600 p-2">
                  <button
                    disabled={!stock.productId}
                    onClick={() => handleDeleteHistory(stock)}
                    className={`px-4 py-1 ${!stock.productId ? "bg-red-900 text-red-500 " : " bg-red-500"} text-white rounded mx-1`}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
