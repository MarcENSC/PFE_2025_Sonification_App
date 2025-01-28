import React from 'react';
import '../../styles/variable_input.css';

interface VariablesInputProps {
  id: string; // ID de l'entrée
  label: string; // Libellé de l'entrée
  values: { [key: string]: number }; // Valeurs initiales
  onChange: (newValue: number) => void; // Fonction pour notifier le parent
}

export const VariablesInput: React.FC<VariablesInputProps> = ({ id, label, values, onChange }) => {
  const handleValueChange = (key: string, newValue: string) => {
    const numericValue = parseFloat(newValue); // Convertir en nombre flottant
    if (!isNaN(numericValue)) {
      onChange(numericValue); // Notifier le parent de la nouvelle valeur
    }
  };

  return (
    <div className="variables-input">
      <label htmlFor={id}>{label}</label>
      <div className="input-container">
        {Object.entries(values).map(([key, value]) => (
          <input
            key={key}
            type="number" // Permet la saisie de nombres flottants
            id={key}
            value={value}
            onChange={(e) => handleValueChange(key, e.target.value)}
            step="any" // Permet de saisir n'importe quel nombre flottant
          />
        ))}
      </div>
    </div>
  );
};