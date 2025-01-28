import React, { useState } from 'react';
import '../../styles/VariableForm.css'; // Importez le fichier CSS

interface VariableFormProps {
  onAddVariable: (name: string, value: number) => void;
}

const VariableForm: React.FC<VariableFormProps> = ({ onAddVariable }) => {
  // Liste de noms de variables préexistants
  const predefinedVariableNames = ['Variable1', 'Variable2', 'Variable3', 'Variable4'];

  // État pour stocker les variables et leurs valeurs
  const [selectedVariableName, setSelectedVariableName] = useState<string>(predefinedVariableNames[0]); // Par défaut, première valeur du tableau
  const [newVariableValue, setNewVariableValue] = useState<number>(0);

  // Fonction pour ajouter une nouvelle variable
  const handleAddVariable = () => {
    // Ajouter la nouvelle variable
    onAddVariable(selectedVariableName, newVariableValue);

    // Réinitialiser la valeur
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
          step="any" // Permet les nombres flottants
        />
      </div>
      <button className="add-button" onClick={handleAddVariable}>
        Add
      </button>
    </div>
  );
};

export default VariableForm;