import React from 'react';
import './KanbanBoard.css';

const KanbanBoard = ({ children }) => {
  return (
    <div className="kanban-board">
      {children}
    </div>
  );
};

export default KanbanBoard;
