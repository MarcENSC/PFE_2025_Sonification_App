import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const Block = ({ id }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    width: '100px', // Taille prédéfinie
    height: '50px', // Taille prédéfinie
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'grab',
    position: 'absolute', // Pour permettre le placement libre
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      Block {id}
    </div>
  );
};

export default Block;
