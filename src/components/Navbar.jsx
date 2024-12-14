import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="flex flex-col md:flex-row justify-between items-center container mx-auto">
        <view>
          <h1 className="text-lg font-bold">Pulse Technology</h1>
          <h1 className="text-sm font-light">Stock Management</h1>
        </view>
        <div className="mt-4 md:mt-0">
          <Link className="px-4 py-2 bg-blue-500 rounded mx-2" to="/">
            Dashboard
          </Link>
          <Link className="px-4 py-2 bg-green-500 rounded mx-2" to="/stock-in">
            Stock In
          </Link>
          <Link className="px-4 py-2 bg-red-500 rounded mx-2" to="/stock-out">
            Stock Out
          </Link>
        </div>
      </div>
    </nav>
  );
}
