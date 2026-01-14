import { useState } from 'react';
import { createPost } from '../api/post';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const token = useAuthStore(s => s.token);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await createPost({ title, content }, token);
    navigate('/dashboard');
  };

  return (
    <form className="card" onSubmit={submit}>
      <h2>Create Post</h2>
      <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Content" onChange={e => setContent(e.target.value)} />
      <button>Publish</button>
    </form>
  );
}
