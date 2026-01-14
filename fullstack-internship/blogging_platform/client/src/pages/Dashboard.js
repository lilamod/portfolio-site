import { Link, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function Dashboard() {
  const logout = useAuthStore(s => s.logout);

  return (
    <div className="layout">
      <aside className="sidebar">
        <h3>Blogging Platform</h3>
        <nav>
          <Link to="/dashboard">Posts</Link>
          <Link to="/dashboard/create">Create Post</Link>
          <button className="danger" onClick={logout}>Logout</button>
        </nav>
      </aside>
      <main className="main">
        <Outlet context={{ setError }} />
      </main>

      {error && (
        <aside className="error-panel">
          <h4>Error</h4>
          <p>{error}</p>
        </aside>
      )}
    </div>
  );
}
