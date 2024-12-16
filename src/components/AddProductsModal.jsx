import { useState } from "react";
import { useStock } from "../context/StockContext";
import axios from "axios"; // You'll need axios or another HTTP client to send data to your backend

export default function AddProductsModal() {
  const [formData, setFormData] = useState({ name: "", stockQuantity: "", image: "" });
  const { setAddProductVisible, handleAddProduct } = useStock();

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pulse_tech_preset");
    formData.append("cloud_name", "dbzdkcxdh");

    try {
      // Upload the image to Cloudinary
      const response = await axios.post("https://api.cloudinary.com/v1_1/dbzdkcxdh/image/upload", formData);
      console.log("response", JSON.stringify(response, null, 2));
      setFormData((prev) => ({
        ...prev,
        image: response.data.secure_url,
      }));
      setUploading(false);
    } catch (error) {
      console.error("Image upload failed:", error);
      setUploading(false);
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   handleAddProduct(formData);
  //   setFormData({ name: "", stockQuantity: "", image: "" });
  // };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Add Your Product</h2>
        <form className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Product Name"
              className="w-full bg-gray-700 p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <input
              type="number"
              name="stockQuantity"
              value={formData.stockQuantity}
              placeholder="Quantity"
              className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              onChange={(e) => setFormData((prev) => ({ ...prev, stockQuantity: parseInt(e.target.value) }))}
              required
            />
          </div>
          {uploading ? (
            <div className="w-10 h-10 flex gap-2 items-center justify-center">
              <div className="w-2 h-5 animate-[ping_1.4s_linear_infinite] bg-sky-600"></div>
              <div className="w-2 h-5 animate-[ping_1.8s_linear_infinite] bg-sky-600"></div>
              <div className="w-2 h-5 animate-[ping_2s_linear_infinite] bg-sky-600"></div>
            </div>
          ) : (
            <>
              {formData.image ? (
                <img className="w-full max-w-[150px] rounded-lg object-cover" src={formData.image} alt={formData?.image} />
              ) : (
                <div>
                  <label htmlFor="type2-2" className="flex w-full max-w-[380px] md:w-[380px]">
                    <div className="w-fit whitespace-nowrap bg-gray-700 px-3 py-2 text-white">Choose File</div>
                    <div className="flex w-full max-w-[380px] items-center border-b-[2px] border-gray-600 px-2 font-medium text-gray-400">
                      {formData.image ? formData.image : "No File Chosen"}
                    </div>
                  </label>
                  <input onChange={handleImageUpload} value={formData.image} className="hidden" type="file" name="" id="type2-2" />
                </div>
              )}
            </>
          )}

          <div className="flex justify-between items-center">
            <button
              onClick={() => handleAddProduct(formData)}
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
              {"Submit"}
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
              onClick={() => setAddProductVisible(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
