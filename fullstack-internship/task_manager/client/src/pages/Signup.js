import { useState } from 'react';
import { signup } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setError } = useOutletContext();

  const submit = async (e) => {
  try {
    e.preventDefault();
    await signup({ email, password });
    navigate('/login');
  } catch (error) {
    setError(error.message);    
  }
  };

  return (
    <div className="container">
      <form className="card" onSubmit={submit}>
        <h2>Signup</h2>
        <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button>Create Account</button>
      </form>
    </div>
  );
}
