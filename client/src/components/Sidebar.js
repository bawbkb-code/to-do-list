import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const { projectId } = useParams();

  return (
    <div className="sidebar">
      <h1>Scrum Board</h1>
      <nav>
        <NavLink to="/">Projects</NavLink>
        {projectId && (
          <>
            <NavLink to={`/projects/${projectId}/sprints`}>Sprints</NavLink>
            <NavLink to={`/projects/${projectId}/backlog`}>Backlog</NavLink>
          </>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
