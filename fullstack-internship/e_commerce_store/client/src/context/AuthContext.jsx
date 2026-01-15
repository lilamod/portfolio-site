import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );
  const [loading, setLoading] = useState(true);

  // Login
  const login = async (email, password) => {
    const res = await api.post("/auth/signin", { email, password });

    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  // Init auth
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuth: !!token,
        login,
        logout,
        loading
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
