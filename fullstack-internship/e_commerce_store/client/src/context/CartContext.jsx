import { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "../api/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!token) {
      setCart([]);
      return;
    }
    setLoading(true);
    try {
      const res = await api.get("/cart/get");
      setCart(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId) => {
    try {
      await api.post("/cart/create", { product: productId, qty: 1 });
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const updateQty = async (cartId, qty) => {
    if (qty < 1) return;
    try {
      await api.put(`/cart/update/${cartId}`, { qty });
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromCart = async (cartId) => {
    try {
      await api.delete(`/cart/delete/${cartId}`);
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const clearCart = async () => {
    try {
      await api.delete("/cart/delete");
      setCart([]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, updateQty, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
