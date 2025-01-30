import React, { useState } from 'react';
import '../../styles/VariableForm.css'; 

interface VariableFormProps {
  onAddVariable: (name: string, value: number) => void;
}

const VariableForm: React.FC<VariableFormProps> = ({ onAddVariable }) => {
  
  const predefinedVariableNames = ['Variable1', 'Variable2', 'Variable3', 'Variable4'];

  const [selectedVariableName, setSelectedVariableName] = useState<string>(predefinedVariableNames[0]); 
  const [newVariableValue, setNewVariableValue] = useState<number>(0);

  
  const handleAddVariable = () => {
   
    onAddVariable(selectedVariableName, newVariableValue);


    setNewVariableValue(0);
  };

  return (
    <div className="variable-form">
      <div className="form-group-variable">
        <select
          className='select-variable'
          id="variable-name"
          value={selectedVariableName}
          onChange={(e) => setSelectedVariableName(e.target.value)}
        >
          {predefinedVariableNames.map((variableName, index) => (
            <option key={index} value={variableName}>
              {variableName}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <input
          className='value-input'
          type="number"
          id="variable-value"
          value={newVariableValue}
          onChange={(e) => setNewVariableValue(parseFloat(e.target.value))}
          step="any" 
        />
      </div>
      <button className="add-button" onClick={handleAddVariable}>
        Add
      </button>
    </div>
  );
};

export default VariableForm;