import React, { useEffect, useState } from 'react';
import { getAllTasks } from '../services/api';

const BacklogPage = () => {
  const [backlogTasks, setBacklogTasks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBacklogTasks();
  }, []);

  const fetchBacklogTasks = async () => {
    try {
      const { data } = await getAllTasks();
      const tasks = data.filter(task => !task.SprintId);
      setBacklogTasks(tasks);
    } catch (err) {
      setError('Could not fetch backlog tasks.');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Product Backlog</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {backlogTasks.map(task => (
          <li key={task.id}>{task.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default BacklogPage;
