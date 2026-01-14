import { useEffect, useState } from 'react';
import {
  getComments,
  addComment,
  deleteComment,
  updateComment
} from '../api/comment';
import { useAuthStore } from '../store/authStore';

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const { token, user } = useAuthStore();

  useEffect(() => {
    getComments(postId).then(setComments);
  }, [postId]);

  const submit = async () => {
    const newComment = await addComment(postId, text, token);
    setComments([...comments, newComment]);
    setText('');
  };

  const saveEdit = async (id, newText) => {
    await updateComment(id, newText, token);
    setComments(
      comments.map(c => c._id === id ? { ...c, text: newText } : c)
    );
    setEditingId(null);
  };

  const remove = async (id) => {
    if (!confirm('Delete this comment?')) return;
    await deleteComment(id, token);
    setComments(comments.filter(c => c._id !== id));
  };

  return (
    <div>
      <h4>Comments</h4>

      {comments.map(c => (
        <div key={c._id} className="card">
          {editingId === c._id ? (
            <>
              <textarea
                defaultValue={c.text}
                onBlur={(e) => saveEdit(c._id, e.target.value)}
              />
            </>
          ) : (
            <p>{c.text}</p>
          )}

          {user?.id === c.author && (
            <div>
              <button onClick={() => setEditingId(c._id)}>✏️</button>
              <button className="danger" onClick={() => remove(c._id)}>🗑️</button>
            </div>
          )}
        </div>
      ))}

      {token && (
        <>
          <textarea
            placeholder="Write a comment..."
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <button onClick={submit}>Add Comment</button>
        </>
      )}
    </div>
  );
}
