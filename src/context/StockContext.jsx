import { createContext, useState, useContext, useEffect } from "react";
import axiosInstance from "../constant/axios";

const StockContext = createContext();

export const useStock = () => useContext(StockContext);

// eslint-disable-next-line react/prop-types
export const StockProvider = ({ children }) => {
  const [stockIn, setStockIn] = useState([]);
  const [stockOut, setStockOut] = useState([]);
  const [products, setProducts] = useState([]);
  const [addProductVisible, setAddProductVisible] = useState(false);
  const [sTUVisible, setSTUVisible] = useState(false);

  const handleAddProduct = (product) => {
    console.log("product", JSON.stringify(product, null, 2));
    axiosInstance
      .post("/product/add", product)
      .then((res) => {
        setProducts((pre) => [res.data.product, ...pre]);
        setAddProductVisible(false);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  const handleStockUpdate = (product) => {
    console.log("product", JSON.stringify(product, null, 2));
    axiosInstance
      .patch(`/product/update/${product._id}`, { ...product, date: new Date() })
      .then((res) => {
        if (res.data.history.type === "in") {
          setStockIn((pre) => [res.data.history, ...pre]);
        } else {
          setStockOut((pre) => [res.data.history, ...pre]);
        }
        setProducts((pre) => {
          return pre.map((item) => (item._id === res.data.product._id ? res.data.product : item));
        });
        setSTUVisible(false);
      })
      .catch((err) => {
        console.log({ error: err });
      });
  };

  const getProducts = () => {
    axiosInstance
      .get("/products")
      .then((res) => {
        if (res.data.success) {
          setProducts(res.data.products.reverse());
        }
      })
      .catch((error) => {
        console.log({ error });
      });
  };
  const getHistories = () => {
    axiosInstance
      .get("/histories")
      .then((res) => {
        if (res.data.success) {
          // console.log("res.data", JSON.stringify(res.data, null, 2));
          setStockIn(res.data.stockIn);
          setStockOut(res.data.stockOut);
        }
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  useEffect(() => {
    getProducts();
    getHistories();
    return () => {
      setProducts([]);
      setStockIn([]);
      setStockOut([]);
    };
  }, []);

  return (
    <StockContext.Provider
      value={{
        addProductVisible,
        setAddProductVisible,
        stockIn,
        stockOut,
        handleAddProduct,
        products,
        handleStockUpdate,
        setSTUVisible,
        sTUVisible,
      }}
    >
      {children}
    </StockContext.Provider>
  );
};
