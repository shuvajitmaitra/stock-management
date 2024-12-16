import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import StockIn from "./pages/StockIn";
import StockOut from "./pages/StockOut";
import { StockProvider } from "./context/StockContext";
import LoginPage from "./pages/LoginPage";

const userJSON = localStorage.getItem("user");
const user = JSON.parse(userJSON);

console.log("user", JSON.stringify(user, null, 2));

function PrivateRoute({ children }) {
  if (!user?.email) {
    return <Navigate to="/" />;
  }

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <StockProvider>
        {user?.email ? (
          <div>
            <Navbar />
            <div className="pt-4 bg-gray-700 min-h-screen">
              <Routes>
                {/* Private Routes */}
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/stock-in"
                  element={
                    <PrivateRoute>
                      <StockIn />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/stock-out"
                  element={
                    <PrivateRoute>
                      <StockOut />
                    </PrivateRoute>
                  }
                />
                {/* Redirect or catch-all route */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>
        ) : (
          <Routes>
            {/* Routes for unauthenticated users */}
            <Route path="/" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </StockProvider>
    </BrowserRouter>
  );
}
