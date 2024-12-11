let stocks = [
  { id: 1, product: "Laptop", quantity: 10, price: 1500 },
  { id: 2, product: "Phone", quantity: 25, price: 800 },
];

export const getStocks = async () => stocks;

export const getStockById = async (id) => stocks.find((stock) => stock.id === id);

export const addStock = async (stock) => {
  stock.id = stocks.length + 1;
  stocks.push(stock);
};

export const updateStock = async (id, updatedStock) => {
  const index = stocks.findIndex((stock) => stock.id === id);
  if (index !== -1) {
    stocks[index] = { ...stocks[index], ...updatedStock };
  }
};

export const deleteStock = async (id) => {
  stocks = stocks.filter((stock) => stock.id !== id);
};
