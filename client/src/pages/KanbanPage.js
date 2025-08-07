import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DndContext, closestCorners } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { getAllTasks, setAuthToken, updateTask } from '../services/api';
import KanbanBoard from '../components/KanbanBoard';
import Column from '../components/Column';

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

  const getTaskById = (id) => tasks.find(task => task.id === id);

  const onDragEnd = async ({ active, over }) => {
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const originalTask = getTaskById(activeId);
    if (!originalTask) return;

    const newStatus = over.id.toString();

    // Optimistic UI update
    const updatedTasks = tasks.map(t =>
      t.id === activeId ? { ...t, status: newStatus } : t
    );
    setTasks(updatedTasks);

    try {
      await updateTask(activeId, { status: newStatus });
    } catch (error) {
      // Revert on error
      setTasks(tasks);
      setError('Failed to update task status.');
    }
  };


  const tasksByStatus = tasks.reduce((acc, task) => {
    const { status } = task;
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(task);
    return acc;
  }, {});

  const columnOrder = ['To Do', 'In Progress', 'Done'];

  return (
    <DndContext onDragEnd={onDragEnd} collisionDetection={closestCorners}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px' }}>
          <h2>Kanban Board</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <KanbanBoard>
          {columnOrder.map(columnName => (
            <Column key={columnName} title={columnName} tasks={tasksByStatus[columnName] || []} />
          ))}
        </KanbanBoard>
      </div>
    </DndContext>
  );
};

export default KanbanPage;
