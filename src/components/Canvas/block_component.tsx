import '../../styles/canva_component.css';
import React, { useState, useEffect } from 'react';
import Control from './variable_control';
import AddIcon from '@atlaskit/icon/core/add';

import * as Tone from 'tone';

interface BoxComponentProps {
  title: string;
  icon?: string;
  description?: string;
  id?: string;
  synth: Tone.Synth;  
  onAddClick?: () => void;
}

const BoxInCanvas: React.FC<BoxComponentProps> = ({
  title,
  icon,
  description,
  id,
  synth,
  onAddClick, // Adding the prop
}) => {
  const [frequency, setFrequency] = useState(440); 

 
  const handleChangeFrequency = (newFrequency: number) => {
    setFrequency(newFrequency); 
    synth.frequency.setValueAtTime(newFrequency, Tone.now()); 
  };

  return (
    <div className="box-component">
      <div className="box-header">
        <div className="box-title">
          <p>{icon}</p>
          <p className="description">{description}</p>
        </div>
        <div className="box-add-icon" onClick={onAddClick}> {}
          <AddIcon label="add-icon" />
        </div>
      </div>
      <div className="box-content">
        {}
        <Control onChangeFrequency={handleChangeFrequency} frequency={frequency} />
      </div>
    </div>
  );
};

export default BoxInCanvas;
