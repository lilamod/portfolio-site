import { useCart } from "../context/CartContext";
import { useOrder } from "../context/OrderContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { placeOrder } = useOrder();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");

  if (!cart.length) return <p>Your cart is empty</p>;

  const total = cart.reduce(
    (sum, item) => sum + (item.productId ? Number(item.productId.price) * Number(item.quantity) : 0),
    0
  );

  const handlePlaceOrder = async () => {
    if (!address) return alert("Please enter your address");
    const orderData = {
        items: cart.map(item => ({
        product: item.productId ? item.productId._id : null,
        quantity: item.quantity,
      })),
      address,
      total,
    };

    await placeOrder(orderData);
    clearCart();
    navigate("/orders");
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Checkout</h2>
      <p>Total: ${total.toFixed(2)}</p>
      <textarea
        placeholder="Enter shipping address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        rows={4}
        style={{ width: "100%", marginBottom: 10 }}
      />
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
}
