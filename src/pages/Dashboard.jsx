import { useEffect, useState } from "react";
import { useStock } from "../context/StockContext";
import Modal from "../components/Modal";
import AddProductsModal from "../components/AddProductsModal";
import { formatDate } from "../constant/commonFunction";
import SearchField from "../components/SearchField";
import ImagePreviewModal from "../components/ImagePreviewModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

export default function Dashboard() {
  const { products, addProductVisible, setAddProductVisible, sTUVisible, setSTUVisible, user, handleDeleteProduct } = useStock();

  const [previewImage, setPreviewImage] = useState(null); // To handle image preview modal visibility
  const [confirmDelete, setConfirmDelete] = useState(null);

  const productOptions = products.map((item) => ({
    label: item.name,
    value: item._id,
  }));

  const handleImageClick = (imageUrl) => {
    setPreviewImage(imageUrl);
  };
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
      <h1 className="text-2xl font-bold mb-4 text-white">Dashboard</h1>

      {/* Action Buttons and Search Field */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center">
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          {user.role === "admin" && (
            <button
              onClick={() => {
                setAddProductVisible(true);
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Add Product
            </button>
          )}
          <button
            onClick={() => {
              setSTUVisible(true);
            }}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Stock Update
          </button>
        </div>
        <div className="mt-4 md:mt-0 w-full sm:w-auto">
          <SearchField />
        </div>
      </div>

      {/* Modals */}
      {sTUVisible && <Modal defaultValues={productOptions[0]} productOptions={productOptions} onClose={() => setSTUVisible(false)} />}
      {addProductVisible && <AddProductsModal />}
      {previewImage && <ImagePreviewModal previewImage={previewImage} setPreviewImage={setPreviewImage} />}
      {confirmDelete && <ConfirmDeleteModal onClick={() => handleDeleteProduct(confirmDelete)} onCancel={() => setConfirmDelete(null)} />}

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800  rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-600">
              <th className="text-center p-3 text-white border border-gray-600 p-2 text-sm">Serial</th>
              <th className="text-center p-3 text-white border border-gray-600 p-2 text-sm">Product Name</th>
              <th className="text-center p-3 text-white border border-gray-600 p-2 text-sm">Product Image</th>
              <th className="text-center p-3 text-white border border-gray-600 p-2 text-sm">Quantity</th>
              <th className="text-center p-3 text-white border border-gray-600 p-2 text-sm">Last Update</th>
              {user.role === "admin" && <th className="text-center p-3 text-white border border-gray-600 p-2 text-sm">Action</th>}
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={item._id} className={`hover:bg-gray-800 transition-colors bg-gray-700`}>
                <td className="text-center border border-gray-600 text-white p-2 text-sm">{index + 1}</td>
                <td className="border border-gray-600 text-white p-2 text-sm">{item.name || item.product}</td>
                <td className="border border-gray-600 text-white p-2 text-sm">
                  {/* Flex container to center the image */}
                  <div className="flex justify-center items-center h-full">
                    <img
                      className="w-16 h-10 rounded-lg object-cover cursor-pointer"
                      src={item.image || "https://pulsetechbd.com/uploads/sitesetting/pulse-(1).png"}
                      alt={item.name || item.product}
                      onClick={() => handleImageClick(item.image || "https://pulsetechbd.com/uploads/sitesetting/pulse-(1).png")}
                    />
                  </div>
                </td>
                <td className={`text-center border border-gray-600 text-white p-2 text-sm ${!item.stockQuantity && "text-red-500"}`}>
                  {item.stockQuantity || item.quantity || "0"}
                </td>
                <td className="text-center border border-gray-600 text-white p-2 text-sm">{formatDate(item.date)}</td>
                {user.role === "admin" && (
                  <td className="text-center border border-gray-600 text-white p-2 text-sm">
                    <button
                      onClick={() => setConfirmDelete(item._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
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
    </div>
  );
}
