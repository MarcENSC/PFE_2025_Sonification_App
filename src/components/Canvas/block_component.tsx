import '../../styles/canva_component.css';
import React, { useState, useEffect } from 'react';
import AddIcon from '@atlaskit/icon/core/add';
import * as Tone from 'tone';
import Block from '../Sound/Audio_blocks/audioBlock'; // Import the Block class

interface BlockComponentProps {
  title: string;
  icon?: string;
  description?: string;
  id?: string;
  type: 'entry' | 'mapping' | 'output'; // Specify the block type
  onAddClick?: () => void; // Optional callback for handling add clicks
}

const BlockInCanvas: React.FC<BlockComponentProps> = ({
  title,
  icon,
  description,
  id,
  type,
  onAddClick,
}) => {
  const [block, setBlock] = useState<Block | null>(null); // Store the block instance
  const [currentTitle, setCurrentTitle] = useState(title); // Store the current title
  const [isEditing, setIsEditing] = useState(false); // To manage editing state

  useEffect(() => {
    // Initialize the block based on its type
    let newBlock: Block | null = null;

    if (type === 'entry') {
      const oscillator = new Tone.Oscillator(440, 'sine'); // Create an oscillator
      newBlock = new Block(id || 'entry-block', 'entry', description || 'Entry block', oscillator);
    } else if (type === 'mapping') {
      newBlock = new Block(id || 'mapping-block', 'mapping', description || 'Mapping block', null, (value) => value * 2); // Example mapping function
    } else if (type === 'output') {
      const gainNode = new Tone.Gain();
      newBlock = new Block(id || 'output-block', 'output', description || 'Output block', gainNode);
    }

    setBlock(newBlock); // Save the block instance
    return () => {
      // Clean up: Disconnect or dispose of the block's node
      newBlock?.node?.dispose();
    };
  }, [type, id, description]);

  // Function to handle title editing
  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditing(false);
    if (block) {
      // Update the block title with the new value
      block.updateTitle(currentTitle);
    }
  };

  return (
    <div className="box-component">
      <div className="box-header">
        <div className="box-title">
          <p>{icon}</p>
          {/* Title is now clickable to update */}
          {isEditing ? (
            <input
              type="text"
              value={currentTitle}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur} // Update when focus is lost
              autoFocus
            />
          ) : (
            <span onClick={handleTitleClick}>{currentTitle}</span> // Display title
          )}
        </div>
        <div className="box-add-icon" onClick={onAddClick}>
          <AddIcon label="add-icon" />
        </div>
      </div>
      <div className="box-content">
        {/* Mapping block can display a mapping function */}
        {type === 'mapping' && block?.mappingFn && (
          <div className="mapping-display">
            <p>Mapping Function: f(x) = x * 2</p> {/* Example function */}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockInCanvas;
