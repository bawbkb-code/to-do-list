import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';

const Column = ({ title, tasks }) => {
  const { setNodeRef } = useDroppable({
    id: title,
  });

  return (
    <div ref={setNodeRef} className="column">
      <h3>{title}</h3>
      <SortableContext
        id={title}
        items={tasks.map(t => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="column-content">
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default Column;
