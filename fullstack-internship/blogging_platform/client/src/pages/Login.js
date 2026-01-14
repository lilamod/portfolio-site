import { useState } from 'react';
import { signin } from '../api/auth';
import { useAuthStore } from '../store/authStore';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore(s => s.login);
  const navigate = useNavigate();
  const { setError } = useOutletContext();

  const submit = async (e) => {
    try {
      e.preventDefault();
      const data = await signin({ email, password });
      login(data);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message || "Failed to login")
    }
  };

  return (
    <div className="container">
      <form className="card" onSubmit={submit}>
        <h2>Login</h2>
        <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button>Login</button>
        <p>No account? <Link to="/signup">Signup</Link></p>
      </form>
    </div>
  );
}
