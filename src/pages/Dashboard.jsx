import { useState } from "react";
import { useStock } from "../context/StockContext";
import Modal from "../components/Modal";
import AddProductsModal from "../components/AddProductsModal";
import { formatDate } from "../constant/commonFunction";
import SearchField from "../components/SearchField";
import ImagePreviewModal from "../components/ImagePreviewModal";

export default function Dashboard() {
  const { products, addProductVisible, setAddProductVisible, sTUVisible, setSTUVisible } = useStock();
  const [previewImage, setPreviewImage] = useState(null); // To handle image preview modal visibility
  const productOptions = products.map((item) => ({
    label: item.name,
    value: item._id,
  }));

  console.log(sTUVisible);

  const handleImageClick = (imageUrl) => {
    setPreviewImage(imageUrl); // Set the image URL to show in the modal
  };

  const closeImagePreview = () => {
    setPreviewImage(null); // Close the image preview modal
  };

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
        <SearchField />
      </div>

      {sTUVisible && <Modal defaultValues={productOptions[0]} productOptions={productOptions} />}
      {addProductVisible && <AddProductsModal />}

      {/* Image Preview Modal */}
      {previewImage && <ImagePreviewModal previewImage={previewImage} setPreviewImage={setPreviewImage} />}

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-center border p-2">Serial</th>
            <th className="text-center border p-2">Product Name</th>
            <th className="text-center border p-2">Product Image</th>
            <th className="text-center border p-2">Quantity</th>
            <th className="text-center border p-2">Last Update</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr key={index}>
              <td className="text-center border p-2">{index + 1}</td>
              <td className="border p-2">{item.name || item.product}</td>
              <td className="border p-1 flex justify-center items-center">
                {
                  <img
                    className="max-w-[150px] h-10 rounded-lg object-cover cursor-pointer"
                    src={item.image || "https://pulsetechbd.com/uploads/sitesetting/pulse-(1).png"}
                    alt={item.name || item.product}
                    onClick={() => handleImageClick(item.image || "https://pulsetechbd.com/uploads/sitesetting/pulse-(1).png")} // Handle click event
                  />
                }
              </td>
              <td className="text-center border p-2">{item.stockQuantity || item.quantity}</td>
              <td className="text-center border p-2">{formatDate(item.date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
