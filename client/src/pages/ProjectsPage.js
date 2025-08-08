import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProjects, createProject } from '../services/api';
import styles from './ProjectsPage.module.css';
import formStyles from './LoginPage.module.css'; // Reusing form styles

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
    <div className={styles.container}>
      <h2>Projects</h2>

      <div className={styles.formWrapper}>
        <h3>Create New Project</h3>
        <form onSubmit={handleCreateProject}>
          <div className={formStyles.formGroup}>
            <label>Name:</label>
            <input type="text" value={newProjectName} onChange={e => setNewProjectName(e.target.value)} required className={formStyles.input} />
          </div>
          <div className={formStyles.formGroup}>
            <label>Description:</label>
            <textarea value={newProjectDescription} onChange={e => setNewProjectDescription(e.target.value)} className={formStyles.input} />
          </div>
          <button type="submit" className={formStyles.button}>Create Project</button>
        </form>
      </div>

      <h3>Your Projects</h3>
      {error && <p className={formStyles.error}>{error}</p>}
      <ul className={styles.projectList}>
        {projects.map(project => (
          <li key={project.id} className={styles.projectItem}>
            <Link to={`/projects/${project.id}/sprints`}>{project.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsPage;
