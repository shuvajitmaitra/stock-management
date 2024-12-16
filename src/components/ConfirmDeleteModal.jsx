export default function ConfirmDeleteModal({ onClick, onCancel, message = "Are you sure you want to delete this item?" }) {
  return (
    <div onClick={onCancel} className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Confirm Deletion</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button onClick={onClick} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
