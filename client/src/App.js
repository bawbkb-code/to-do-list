import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import KanbanPage from './pages/KanbanPage';
import BacklogPage from './pages/BacklogPage';
import SprintsPage from './pages/SprintsPage';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<SprintsPage />} /> {/* Default to sprints page */}
          <Route path="/sprints/:sprintId/board" element={<KanbanPage />} />
          <Route path="/backlog" element={<BacklogPage />} />
          <Route path="/sprints" element={<SprintsPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
