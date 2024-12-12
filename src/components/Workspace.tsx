import React from 'react';
import { DndContext, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Block from '../components/Blocks';




const Workspace = ({ items, setItems }) => {
  const sensors = useSensors(useSensor(MouseSensor));

  const handleDragEnd = (event) => {
    const { over } = event;
    if (over) {
      const overIndex = items.indexOf(over.id);
      if (overIndex !== -1) {
        setItems((items) => {
          const oldIndex = items.indexOf(event.active.id);
          return arrayMove(items, oldIndex, overIndex);
        });
      }
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div style={{ position: 'relative', width: '100%', height: '100vh', border: '1px solid #000' }}>
        {items.map((id) => (
          <Block key={id} id={id} />
        ))}
      </div>
    </DndContext>
  );
};

export default Workspace;
