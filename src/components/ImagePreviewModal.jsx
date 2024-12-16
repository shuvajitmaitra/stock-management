export default function ImagePreviewModal({ previewImage, setPreviewImage }) {
  return (
    <div onClick={() => setPreviewImage(null)} className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded w-96">
        <img className="w-full w-96 rounded object-cover" src={previewImage} alt={previewImage} />
      </div>
    </div>
  );
}
