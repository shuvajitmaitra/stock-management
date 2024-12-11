import { createContext, useState, useContext } from "react";

const StockContext = createContext();

export const useStock = () => useContext(StockContext);

// eslint-disable-next-line react/prop-types
export const StockProvider = ({ children }) => {
  const [stockIn, setStockIn] = useState([]);
  const [stockOut, setStockOut] = useState([]);

  const addStockIn = (product) => setStockIn([...stockIn, { ...product, id: Date.now() }]);
  const addStockOut = (product) => setStockOut([...stockOut, { ...product, id: Date.now() }]);

  const editStock = (id, type, updatedProduct) => {
    if (type === "in") {
      setStockIn(stockIn.map((item) => (item.id === id ? updatedProduct : item)));
    } else {
      setStockOut(stockOut.map((item) => (item.id === id ? updatedProduct : item)));
    }
  };

  const deleteStock = (id, type) => {
    if (type === "in") {
      setStockIn(stockIn.filter((item) => item.id !== id));
    } else {
      setStockOut(stockOut.filter((item) => item.id !== id));
    }
  };

  return (
    <StockContext.Provider value={{ stockIn, stockOut, addStockIn, addStockOut, editStock, deleteStock }}>{children}</StockContext.Provider>
  );
};
