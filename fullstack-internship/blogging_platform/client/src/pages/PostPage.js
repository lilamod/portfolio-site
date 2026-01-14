import { useEffect, useState } from 'react';
import { getPosts, deletePost, updatePost } from '../api/post';
import { useAuthStore } from '../store/authStore';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
 const { setError } = useOutletContext();

  const { token, user } = useAuthStore();

  useEffect(() => {
    getPosts().then(setPosts)
     .catch(err => setError(err.message || 'Failed to fetch posts'));;
  }, []);

  const confirmDelete = async () => {
    try {
       await deletePost(selectedPost._id, token);
    closeDialogs();
    } catch (err) {
      setError(err.message || 'Failed to delete post');
    }   
  };

  const saveUpdate = async () => {
    try {
        await updatePost(
          selectedPost._id,
          { title: selectedPost.title, content: selectedPost.content },
          token
        );
    
        closeDialogs();
    } catch (error) {
        setError(err.message || 'Failed to update post');
    }
  };

  const closeDialogs = () => {
    setSelectedPost(null);
    setEditMode(false);
    setShowDeleteConfirm(false);
  };

  return (
    <div>
      <h2>Posts</h2>

      {posts.map(p => (
        <div key={p._id} className="card post-card">
          <h3>{p.title}</h3>
          <p className="post-excerpt">{p.content.slice(0, 120)}...</p>

          <div className="post-actions">
            <button
              className="icon-btn"
              title="View"
              onClick={() => setSelectedPost({ ...p })}
            >
              👁️
            </button>
           
              <button
                className="icon-btn"
                title="Edit"
                onClick={() => {
                  setSelectedPost({ ...p });
                  setEditMode(true);
                }}
              >
                ✏️
              </button>

           
              <button
                className="icon-btn danger"
                title="Delete"
                onClick={() => {
                  setSelectedPost(p);
                  setShowDeleteConfirm(true);
                }}
              >
                🗑️
              </button>
          </div>
        </div>
      ))}

      {selectedPost && !showDeleteConfirm && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>{editMode ? 'Edit Post' : 'View Post'}</h3>

            <input
              disabled={!editMode}
              value={selectedPost.title}
              onChange={(e) =>
                setSelectedPost({ ...selectedPost, title: e.target.value })
              }
            />

            <textarea
              disabled={!editMode}
              value={selectedPost.content}
              onChange={(e) =>
                setSelectedPost({ ...selectedPost, content: e.target.value })
              }
            />

            <div className="modal-actions">
              <button className="secondary" onClick={closeDialogs}>
                Close
              </button>

              {editMode && (
                <button onClick={saveUpdate}>
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this post?</p>

            <div className="modal-actions">
              <button className="secondary" onClick={closeDialogs}>
                Cancel
              </button>
              <button className="danger" onClick={confirmDelete}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
