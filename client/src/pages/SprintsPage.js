import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DndContext, closestCorners } from '@dnd-kit/core';
import { getAllSprints, createSprint, getAllTasks, updateTask } from '../services/api';
import { useDraggable } from '@dnd-kit/core';
import { useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const DraggableTask = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: { task },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    padding: '10px',
    margin: '5px 0',
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '3px',
    cursor: 'grab',
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {task.content}
    </div>
  );
};

const DroppableSprint = ({ sprint, children }) => {
  const { setNodeRef } = useDroppable({
    id: sprint.id,
  });

  const style = {
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '10px',
    margin: '10px 0',
    backgroundColor: '#f9f9f9',
  };

  return (
    <div ref={setNodeRef} style={style}>
      <h4>{sprint.name}</h4>
      {children}
    </div>
  );
};

const SprintsPage = () => {
  const [sprints, setSprints] = useState([]);
  const [backlogTasks, setBacklogTasks] = useState([]);
  const [error, setError] = useState('');
  const [newSprintName, setNewSprintName] = useState('');
  const [newSprintStart, setNewSprintStart] = useState('');
  const [newSprintEnd, setNewSprintEnd] = useState('');
  const { projectId } = useParams();

  useEffect(() => {
    if (projectId) {
      fetchSprints();
      fetchBacklogTasks();
    }
  }, [projectId]);

  const fetchSprints = async () => {
    try {
      const { data } = await getAllSprints(projectId);
      setSprints(data);
    } catch (err) {
      setError('Could not fetch sprints.');
    }
  };

  const fetchBacklogTasks = async () => {
    try {
      // Need to update getAllTasks to filter by project
      const { data } = await getAllTasks(projectId);
      setBacklogTasks(data.filter(task => !task.SprintId));
    } catch (err) {
      setError('Could not fetch backlog tasks.');
    }
  };

  const handleCreateSprint = async (e) => {
    e.preventDefault();
    try {
      await createSprint(projectId, { name: newSprintName, startDate: newSprintStart, endDate: newSprintEnd });
      setNewSprintName('');
      setNewSprintStart('');
      setNewSprintEnd('');
      fetchSprints();
    } catch (err) {
      setError('Could not create sprint.');
    }
  };

  const onDragEnd = async ({ active, over }) => {
    if (over && active.id !== over.id) {
      const taskId = active.id;
      const sprintId = over.id;

      const task = backlogTasks.find(t => t.id === taskId);
      if (task) {
        setBacklogTasks(prev => prev.filter(t => t.id !== taskId));
      }

      try {
        await updateTask(taskId, { SprintId: sprintId });
        fetchSprints();
      } catch (error) {
        setError('Failed to assign task to sprint.');
        if (task) {
          setBacklogTasks(prev => [...prev, task]);
        }
      }
    }
  };

  return (
    <DndContext onDragEnd={onDragEnd} collisionDetection={closestCorners}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        <div style={{ width: '45%' }}>
          <h2>Sprints for Project {projectId}</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <h3>Create New Sprint</h3>
          <form onSubmit={handleCreateSprint}>
            {/* ... form fields ... */}
          </form>

          <h3>All Sprints</h3>
          {sprints.map(sprint => (
            <DroppableSprint key={sprint.id} sprint={sprint}>
              <Link to={`/projects/${projectId}/sprints/${sprint.id}/board`}>View Board</Link>
              <p>Drop tasks here</p>
              {sprint.Tasks && sprint.Tasks.map(task => (
                <div key={task.id} style={{padding: '5px', margin: '2px 0', backgroundColor: '#e9e9e9'}}>{task.content}</div>
              ))}
            </DroppableSprint>
          ))}
        </div>

        <div style={{ width: '45%' }}>
          <h3>Product Backlog</h3>
          {backlogTasks.map(task => (
            <DraggableTask key={task.id} task={task} />
          ))}
        </div>
      </div>
    </DndContext>
  );
};

export default SprintsPage;
