import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';
import styles from './KanbanBoard.module.css'; // Reusing styles from KanbanBoard module

const Column = ({ title, tasks }) => {
  const { setNodeRef } = useDroppable({
    id: title,
  });

  return (
    <div ref={setNodeRef} className={styles.column}>
      <h3>{title}</h3>
      <SortableContext
        id={title}
        items={tasks.map(t => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className={styles.columnContent}>
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default Column;
