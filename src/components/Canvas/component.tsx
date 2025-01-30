import '../../styles/canva_component.css';
import React, { useState, useEffect } from 'react';
import Control from './variable_control'; // Import Control component
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
  const [frequency, setFrequency] = useState(440); // Default frequency (440 Hz)

  // Function to handle frequency change from Control component
  const handleChangeFrequency = (newFrequency: number) => {
    setFrequency(newFrequency); // Update frequency state
    synth.frequency.setValueAtTime(newFrequency, Tone.now()); // Update frequency of the synth
  };

  return (
    <div className="box-component">
      <div className="box-header">
        <div className="box-title">
          <p>{icon}</p>
          <p className="description">{title}</p>
        </div>
        <div className="box-add-icon" onClick={onAddClick}> {/* Handle Add Icon click */}
          <AddIcon label="add-icon" />
        </div>
      </div>
      <div className="box-content">
        {/* Pass the handleChangeFrequency function and current frequency as props to Control */}
        <Control onChangeFrequency={handleChangeFrequency} frequency={frequency} />
      </div>
    </div>
  );
};

export default BoxInCanvas;
