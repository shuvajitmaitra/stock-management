import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import StockIn from "./pages/StockIn";
import StockOut from "./pages/StockOut";
import { StockProvider } from "./context/StockContext";
import LoginPage from "./pages/LoginPage";
import { useState } from "react";
import axios from "axios";

export default function App() {
  const [isAuthenticate, setIsAuthenticate] = useState(false);

  const handleUserLogin = (e) => {
    e.preventDefault();
    console.log(e.target.email.value);
    axios
      .get("https://stock-management-server-khaki.vercel.app/products")
      .then((res) => {
        if (res.data.success) {
          setIsAuthenticate(false);
        }
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  return (
    <StockProvider>
      <Router>
        {isAuthenticate ? (
          <Routes>
            <Route path="/" element={<LoginPage handleUserLogin={handleUserLogin} />} />
          </Routes>
        ) : (
          <div>
            <Navbar />
            <div className="mt-4">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/stock-in" element={<StockIn />} />
                <Route path="/stock-out" element={<StockOut />} />
              </Routes>
            </div>
          </div>
        )}
      </Router>
    </StockProvider>
  );
}
