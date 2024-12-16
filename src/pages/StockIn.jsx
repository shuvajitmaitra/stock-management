import { useStock } from "../context/StockContext";
import { formatDate } from "../constant/commonFunction";

export default function StockIn() {
  const { stockIn, handleDeleteHistory, user } = useStock();
  console.log("stockIn", JSON.stringify(stockIn, null, 2));

  return (
    <div className="container mx-auto p-4 min-h-100vh bg-gray-700">
      <h1 className="text-2xl font-bold mb-4 text-white">Stock In</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-600">
            <th className="border p-2 text-center border-gray-600 text-white">Product</th>
            <th className="border p-2 text-center border-gray-600 text-white">Quantity</th>
            <th className="border p-2 text-center border-gray-600 text-white">Date</th>
            {user.role === "admin" && <th className="border p-2 text-center border-gray-600 text-white">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {stockIn.map((stock) => (
            <tr key={stock._id}>
              <td className=" border border-gray-600 text-white p-2">{stock.name}</td>
              <td className=" text-center border-gray-600 text-white border p-2">{stock.stockQuantity}</td>
              <td className=" text-center border-gray-600 text-white border p-2">{formatDate(stock.date)}</td>
              {user.role === "admin" && (
                <td className=" text-center border-gray-600 text-white border p-2">
                  <button onClick={() => handleDeleteHistory(stock)} className="px-4 py-1 bg-red-500 text-white rounded mx-1">
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
