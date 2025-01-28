import React from 'react';
import '../../styles/AddVariablesWidget.css'; // Importez le fichier CSS
import AddIcon from '@atlaskit/icon/core/add';

interface AddVariablesWidgetProps {
  onClick: () => void; // Fonction à exécuter lors du clic
}

const AddVariablesWidget: React.FC<AddVariablesWidgetProps> = ({ onClick }) => {
  return (
    <div className="add-variables-widget" onClick={onClick}>
      <AddIcon label="add icon" />
      <span className="add-variables-text">Add Variables</span>
    </div>
  );
};

export default AddVariablesWidget;