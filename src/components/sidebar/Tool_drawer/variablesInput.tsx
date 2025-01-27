import React, { useState } from 'react';
import '../../../styles/variable_input.css';

interface VariablesInputProps {
  id: string; // ID de l'entrée
  label: string; // Libellé de l'entrée
  values: { [key: string]: number }; // Valeurs initiales
}

export const VariablesInput: React.FC<VariablesInputProps> = ({ id, label, values }) => {
  const [inputValues, setInputValues] = useState<{ [key: string]: number }>(values);

  // Gérer le changement de valeur pour un champ spécifique
  const handleValueChange = (key: string, newValue: string) => {
    const numericValue = parseFloat(newValue); // Convertir en nombre flottant
    if (!isNaN(numericValue)) { // Vérifier si la conversion est valide
      setInputValues((prevValues) => ({
        ...prevValues,
        [key]: numericValue,
      }));
    }
  };

  return (
    <div className="variables-input">
      <label htmlFor={id}>{label}</label>
      <div className="input-container">
        {Object.entries(inputValues).map(([key, value]) => (
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