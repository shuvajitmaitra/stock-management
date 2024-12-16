import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white sticky top-0 shadow-lg z-50">
      <div className="flex flex-col md:flex-row justify-between items-center container mx-auto">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-wide">Pulse Technologies</h1>
          <h2 className="text-sm font-light text-gray-400">Stock Management</h2>
        </div>
        <div className="mt-4 md:mt-0 space-x-6 flex items-center">
          <NavLink
            exact
            to="/"
            className={({ isActive }) =>
              isActive ? "bg-gray-600 py-1 px-4 rounded-full" : " hover:bg-gray-900 py-1 px-4 hover:rounded-full"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/stock-in"
            className={({ isActive }) =>
              isActive ? "bg-gray-600 py-1 px-4 rounded-full" : " hover:bg-gray-900 py-1 px-4 hover:rounded-full"
            }
          >
            Stock In
          </NavLink>
          <NavLink
            to="/stock-out"
            className={({ isActive }) =>
              isActive ? "bg-gray-600 py-1 px-4 rounded-full" : " hover:bg-gray-900 py-1 px-4 hover:rounded-full"
            }
          >
            Stock Out
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
