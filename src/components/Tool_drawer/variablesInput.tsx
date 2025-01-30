import React from 'react';
import '../../styles/variable_input.css';

interface VariablesInputProps {
  id: string; 
  label: string; 
  values: { [key: string]: number }; 
  onChange: (newValue: number) => void;
}

export const VariablesInput: React.FC<VariablesInputProps> = ({ id, label, values, onChange }) => {
  const handleValueChange = (key: string, newValue: string) => {
    const numericValue = parseFloat(newValue); 
    if (!isNaN(numericValue)) {
      onChange(numericValue); 
    }
  };

  return (
    <div className="variables-input">
      <label htmlFor={id}>{label}</label>
      <div className="input-container">
        {Object.entries(values).map(([key, value]) => (
          <input
            key={key}
            type="number" 
            id={key}
            value={value}
            onChange={(e) => handleValueChange(key, e.target.value)}
            step="any" 
          />
        ))}
      </div>
    </div>
  );
};