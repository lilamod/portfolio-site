import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, loading, updateQty, removeFromCart, clearCart } = useCart();

  if (loading) return <p>Loading cart...</p>;
  if (!cart.length) return <p>Your cart is empty.</p>;

  const total = cart.reduce((sum, item) => item.productId ? sum + item.productId.price * item.quantity : sum,0);


  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: 20 }}>
      <h2>Your Cart</h2>
      {cart.map(item => (
        <div key={item._id} style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}>
          <h4>{ item.productId ? item.productId.name : ""}</h4>
          <p>Price: ${ item.productId ? item.productId.price : ""}</p>
          <p>Qty: { item.productId ? item.productId.qty: 0}</p>
          <button onClick={() => updateQty(item._id, item.productId ? item.productId.qty: 0 + 1)}>+</button>
          <button onClick={() => updateQty(item._id, item.productId ? item.productId.qty: 0 - 1)}>-</button>
          <button onClick={() => removeFromCart(item._id)}>Remove</button>
        </div>
      ))}
      <h3>Total: ${total.toFixed(2)}</h3>
      <button onClick={clearCart} style={{ marginRight: 10 }}>Clear Cart</button>
      <button onClick={() => window.location.href = "/checkout"}>Checkout</button>
    </div>
  );
}
