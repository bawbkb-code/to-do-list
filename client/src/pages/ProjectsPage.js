import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProjects, createProject } from '../services/api';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await getAllProjects();
      setProjects(data);
    } catch (err) {
      setError('Could not fetch projects.');
      console.error(err);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await createProject({ name: newProjectName, description: newProjectDescription });
      setNewProjectName('');
      setNewProjectDescription('');
      fetchProjects();
    } catch (err) {
      setError('Could not create project.');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Projects</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h3>Create New Project</h3>
      <form onSubmit={handleCreateProject}>
        <div>
          <label>Name:</label>
          <input type="text" value={newProjectName} onChange={e => setNewProjectName(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={newProjectDescription} onChange={e => setNewProjectDescription(e.target.value)} />
        </div>
        <button type="submit">Create Project</button>
      </form>

      <h3>Your Projects</h3>
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            <Link to={`/projects/${project.id}/sprints`}>{project.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsPage;
