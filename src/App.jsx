import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import StockIn from "./pages/StockIn";
import StockOut from "./pages/StockOut";
import { StockProvider } from "./context/StockContext";

export default function App() {
  return (
    <StockProvider>
      <Router>
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
      </Router>
    </StockProvider>
  );
}
