import React from 'react';
import styles from './KanbanBoard.module.css';

const KanbanBoard = ({ children }) => {
  return (
    <div className={styles.kanbanBoard}>
      {children}
    </div>
  );
};

export default KanbanBoard;
