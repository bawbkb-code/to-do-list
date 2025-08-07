import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '10px',
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #dee2e6',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#007bff',
    fontWeight: 'bold',
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>Kanban Board</Link>
      <Link to="/backlog" style={linkStyle}>Backlog</Link>
      <Link to="/sprints" style={linkStyle}>Sprints</Link>
    </nav>
  );
};

export default Navbar;
