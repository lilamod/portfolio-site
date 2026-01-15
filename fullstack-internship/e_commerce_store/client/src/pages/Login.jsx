import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { isAuth, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuth) navigate("/");
  }, [isAuth, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form onSubmit={submitHandler} className="auth-form">
      <h2>Login</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password}
        onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}
