import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useStock } from "../context/StockContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { handleLogout } = useStock();

  return (
    <nav className="bg-gray-800 p-4 text-white sticky top-0 shadow-lg z-50">
      <div className="flex flex-col md:flex-row justify-between items-center container mx-auto">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-wide">Pulse Technologies</h1>
          <h2 className="text-sm font-light text-gray-400">Stock Management</h2>
        </div>
        {/* Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            type="button"
            className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            {!isOpen ? (
              // Hamburger Icon
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
              </svg>
            ) : (
              // Close Icon
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>
        {/* Navigation Links */}
        <div className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto mt-4 md:mt-0`} id="mobile-menu">
          <div className="space-y-4 md:space-y-0 md:space-x-6 flex flex-col md:flex-row items-center">
            <NavLink
              exact
              to="/"
              className={({ isActive }) =>
                isActive ? "bg-gray-600 py-1 px-4 rounded-full" : "hover:bg-gray-900 py-1 px-4 hover:rounded-full"
              }
              onClick={() => setIsOpen(false)} // Close menu on link click
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/stock-in"
              className={({ isActive }) =>
                isActive ? "bg-gray-600 py-1 px-4 rounded-full" : "hover:bg-gray-900 py-1 px-4 hover:rounded-full"
              }
              onClick={() => setIsOpen(false)} // Close menu on link click
            >
              Stock In
            </NavLink>
            <NavLink
              to="/stock-out"
              className={({ isActive }) =>
                isActive ? "bg-gray-600 py-1 px-4 rounded-full" : "hover:bg-gray-900 py-1 px-4 hover:rounded-full"
              }
              onClick={() => setIsOpen(false)} // Close menu on link click
            >
              Stock Out
            </NavLink>
            <button onClick={handleLogout} className="bg-red-600 py-1 px-4 rounded">
              Log out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
