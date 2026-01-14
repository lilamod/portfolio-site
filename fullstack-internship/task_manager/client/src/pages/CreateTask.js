import { useState } from 'react';
import { createTask } from '../api/task';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

export default function CreateTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('');
  const token = useAuthStore(s => s.token);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await createTask({ title, description, dueDate, status }, token);
    navigate('/dashboard');
  };

  return (
    <form className="card" onSubmit={submit}>
      <h2>Create Post</h2>
      <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Description" onChange={e => setDescription(e.target.value)} />
      <select onChange={e => setStatus(e.target.value)}>
        <option value="pending">Pending</option>
        <option value="in-progress">InProgress</option>
        <option value="completed">Completed</option>
		</select>
    <input type='date' placeholder='DueDate' onChange={e => setDueDate(e.target.value)} />
      <button>Create Task</button>
    </form>
  );
}
