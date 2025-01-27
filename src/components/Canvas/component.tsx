import '../../styles/canva_component.css';
import React from 'react';
import Control from './variable_control';
import AddIcon from '@atlaskit/icon/core/add';

interface BoxComponentProps {
  title: string;
  icon?: string;
  description?: string;
  id?: string;
  onAddClick?: () => void; // Nouvelle prop pour gérer le clic sur l'icône "Add"
}

const BoxInCanvas: React.FC<BoxComponentProps> = ({
  title,
  icon,
  description,
  id,
  onAddClick, // Ajout de la prop
}) => {
  return (
    <div className='box-component'>
      <div className="box-header">
        <div className='box-title'>
          <p>{icon}</p>
          <p className='description'>{description}</p>
        </div>
        <div className='box-add-icon' onClick={onAddClick}> {/* Gestion du clic */}
          <AddIcon label='add-icon' />
        </div>
      </div>
      <div className='box-content'>
        <Control />
      </div>
    </div>
  );
};

export default BoxInCanvas;