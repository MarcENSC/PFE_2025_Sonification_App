import React from 'react';
import { useDrag } from 'react-dnd';
import '../../styles/drag_boxes.css';

interface BoxProps {
  children?: React.ReactNode;
  title: string;
  icon: string;  // Icône de la boîte
  description: string;
  id?: string;
}

const Box: React.FC<BoxProps> = ({ title, icon, description, id = 'default-box' }) => {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: 'BOX',
    item: {
      type: 'BOX',
      id: id,
      title: title,       // Transmettre le titre
      icon: icon,         // Transmettre l'icône
      description: description // Transmettre la description
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));

  return (
    <div
      className='box'
      ref={dragPreview}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      <div
        role="Handle"
        ref={drag}
        style={{
          width: '100%',
          height: '100%',
          color: '#333',
        }}
      >
        <div className="box-content">
          <p className='icon'>{icon}</p> {/* Icône */}
          <p className='description'>{description}</p> {/* Description */}
        </div>
      </div>
    </div>
  );
};

export default Box;