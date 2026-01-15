// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";

import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Register from "./pages/Register";

const PrivateRoute = ({ children }) => {
  const { isAuth } = useAuth();
  return isAuth ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <Router />
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}

function Router() {
  const { isAuth, logout } = useAuth();

  return (
    <BrowserRouter>
      <nav style={{ backgroundColor: "#222", padding: 10 }}>
        <Link to="/" style={{ color: "white", marginRight: 10 }}>
          Products
        </Link>
        {isAuth && (
          <>
            <Link to="/cart" style={{ color: "white", marginRight: 10 }}>
              Cart
            </Link>
            <Link to="/orders" style={{ color: "white", marginRight: 10 }}>
              Orders
            </Link>
            <button
              onClick={logout}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        )}
        {!isAuth && (
          <>
            <Link to="/login" style={{ color: "white", marginRight: 10 }}>
              Login
            </Link>
            <Link to="/register" style={{ color: "white" }}>
              Register
            </Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route
          path="/login"
          element={isAuth ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuth ? <Navigate to="/" replace /> : <Register />}
        />

        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />

        {/* Optional: fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
