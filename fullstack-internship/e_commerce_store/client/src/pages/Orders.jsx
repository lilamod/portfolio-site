import { useEffect } from "react";
import { useOrder } from "../context/OrderContext";

export default function Orders() {
  const { orders, loading, fetchOrders } = useOrder();

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (!orders.length) return <p>No orders found</p>;

  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: 20 }}>
      <h2>Your Orders</h2>
      {orders.map((order) => (
        <div key={order._id} style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}>
          <p><b>Order ID:</b> {order._id}</p>
          <p><b>Total:</b> {order.total ? order.total : 0}</p>
          <p><b>Address:</b> {order.address}</p>
          <p><b>Items:</b></p>
          <ul>
            {order.items >0  && order.items.map((item) => (
              <li key={item.product._id}>{item.product.name} x {item.qty}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
