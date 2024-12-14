import { useStock } from "../context/StockContext";
import Modal from "../components/Modal";
import AddProductsModal from "../components/AddProductsModal";
import { formatDate } from "../constant/commonFunction";

export default function Dashboard() {
  const { products, addProductVisible, setAddProductVisible, sTUVisible, setSTUVisible } = useStock();
  // console.log("products", JSON.stringify(products, null, 2));
  const productOptions = products.map((item) => ({
    label: item.name,
    value: item._id,
  }));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => {
            setAddProductVisible(true);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Product
        </button>
        <button
          onClick={() => {
            setSTUVisible(true);
          }}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Stock Update
        </button>
      </div>
      {sTUVisible && <Modal defaultValues={productOptions[0]} productOptions={productOptions} />}
      {addProductVisible && <AddProductsModal />}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Sr.</th>
            <th className="border p-2">Product Name</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Last update</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr key={index}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{item.name || item.product}</td>
              <td className="border p-2">{item.stockQuantity || item.quantity}</td>
              <td className="border p-2">{formatDate(item.date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
