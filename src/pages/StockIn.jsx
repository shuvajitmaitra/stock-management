import { useStock } from "../context/StockContext";
import { formatDate } from "../constant/commonFunction";

export default function StockIn() {
  const { stockIn, handleDeleteHistory } = useStock();
  console.log("stockIn", JSON.stringify(stockIn, null, 2));

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
            <tr key={stock._id}>
              <td className="border p-2">{stock.name}</td>
              <td className="border p-2">{stock.stockQuantity}</td>
              <td className="border p-2">{formatDate(stock.date)}</td>
              <td className="border p-2">
                <button onClick={() => handleDeleteHistory(stock)} className="px-4 py-1 bg-red-500 text-white rounded mx-1">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
