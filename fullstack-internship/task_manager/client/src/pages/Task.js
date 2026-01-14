import { useEffect, useState } from 'react';
import { getTask, deleteTask, updateTask } from '../api/task';
import { useAuthStore } from '../store/authStore';

export default function Posts() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { setError } = useOutletContext();

  const { token } = useAuthStore();

  useEffect(() => {
    getTask().then(setTasks).catch(err => setError(err.message));
  }, []);

  const confirmDelete = async () => {
    try {
      await deleteTask(selectedTask._id, token);
      closeDialogs();
    } catch (error) {
      setError(error.message);      
    }
  };

  const saveUpdate = async () => {
    try {
      await updateTask(
        selectedTask._id,
        {
          title: selectedTask.title,
          description: selectedTask.description,
          dueDate: selectedTask.dueDate,
          status: selectedTask.status
        },
        token
      );
  
      closeDialogs();
    } catch (error) {
      setError(error.message)      
    }
  };

  const closeDialogs = () => {
    setSelectedTask(null);
    setEditMode(false);
    setShowDeleteConfirm(false);
  };

  return (
    <div>
      <h2>Tasks</h2>

      {tasks.map(task => (
        <div key={task._id} className="card post-card">
          <h3>{task.title}</h3>

          <p className="post-excerpt">
            {task.description?.slice(0, 120)}...
          </p>

          <p><strong>Status:</strong> {task.status}</p>
          <p><strong>Due:</strong> {task.dueDate}</p>

          <div className="post-actions">
            <button
              className="icon-btn"
              title="View"
              onClick={() => setSelectedTask({ ...task })}
            >
              👁️
            </button>

            <button
              className="icon-btn"
              title="Edit"
              onClick={() => {
                setSelectedTask({ ...task });
                setEditMode(true);
              }}
            >
              ✏️
            </button>

            <button
              className="icon-btn danger"
              title="Delete"
              onClick={() => {
                setSelectedTask(task);
                setShowDeleteConfirm(true);
              }}
            >
              🗑️
            </button>
          </div>
        </div>
      ))}

      {selectedTask && !showDeleteConfirm && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>{editMode ? 'Edit Task' : 'View Task'}</h3>

            <input
              disabled={!editMode}
              value={selectedTask.title}
              onChange={e =>
                setSelectedTask({ ...selectedTask, title: e.target.value })
              }
            />

            <textarea
              disabled={!editMode}
              value={selectedTask.description}
              onChange={e =>
                setSelectedTask({ ...selectedTask, description: e.target.value })
              }
            />

            <input
              type="date"
              disabled={!editMode}
              value={selectedTask.dueDate}
              onChange={e =>
                setSelectedTask({ ...selectedTask, dueDate: e.target.value })
              }
            />

            <select
              disabled={!editMode}
              value={selectedTask.status}
              onChange={e =>
                setSelectedTask({ ...selectedTask, status: e.target.value })
              }
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

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
            <p>Are you sure you want to delete this task?</p>

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
