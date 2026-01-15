import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "./AuthContext";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    if (!token) {
      setOrders([]);
      return;
    }
    setLoading(true);
    try {
      const res = await api.get("/order/get");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const placeOrder = async (orderData) => {
    try {
      await api.post("/order/create", orderData);
      alert("Order placed!");
      fetchOrders();
    } catch (err) {
      alert("Failed to place order");
      console.error(err);
    }
  };

  return (
    <OrderContext.Provider value={{ orders, loading, fetchOrders, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
