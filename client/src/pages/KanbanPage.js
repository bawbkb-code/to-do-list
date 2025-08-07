import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTasks, setAuthToken } from '../services/api';

const KanbanPage = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      fetchTasks();
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const fetchTasks = async () => {
    try {
      const { data } = await getAllTasks();
      setTasks(data);
    } catch (err) {
      setError('Could not fetch tasks.');
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    navigate('/login');
  };

  return (
    <div>
      <h2>Kanban Board</h2>
      <button onClick={handleLogout}>Logout</button>

      <h3>Your Tasks:</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {tasks.length > 0 ? (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>{task.content} - ({task.status})</li>
          ))}
        </ul>
      ) : (
        <p>You have no tasks.</p>
      )}
    </div>
  );
};

export default KanbanPage;
