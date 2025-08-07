import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllTasks } from '../services/api';

const BacklogPage = () => {
  const [backlogTasks, setBacklogTasks] = useState([]);
  const [error, setError] = useState('');
  const { projectId } = useParams();

  useEffect(() => {
    if (projectId) {
      fetchBacklogTasks();
    }
  }, [projectId]);

  const fetchBacklogTasks = async () => {
    try {
      const { data } = await getAllTasks(projectId);
      const tasks = data.filter(task => !task.SprintId);
      setBacklogTasks(tasks);
    } catch (err) {
      setError('Could not fetch backlog tasks.');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Product Backlog for Project {projectId}</h2>
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
