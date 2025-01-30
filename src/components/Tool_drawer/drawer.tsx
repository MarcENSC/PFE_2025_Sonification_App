import React, { useState } from 'react';
import '../../styles/Drawer.css'; // Importez le fichier CSS global
import { VariablesInput } from './variablesInput';
import CloseIcon from '@atlaskit/icon/core/close';
import AngleBracketsIcon from '@atlaskit/icon/core/angle-brackets';
import AddVariablesWidget from './add-widget';
import VariableForm from './form';

// Définir les props du composant Drawer
interface DrawerProps {
  isOpen: boolean; // Indique si le drawer est ouvert
  onClose: () => void; // Fonction pour fermer le drawer
  titre?: string; // Titre optionnel du drawer
  id?: string; // ID optionnel du drawer
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, titre, id }) => {
  // État pour stocker les variables et leurs valeurs
  const [variables, setVariables] = useState<{ [key: string]: number }>({});
  const [showForm, setShowForm] = useState<boolean>(false);

  // Fonction pour afficher le formulaire
  const handleAddVariableClick = () => {
    setShowForm(true);
  };

  // Fonction pour ajouter une nouvelle variable
  const handleAddVariable = (name: string, value: number) => {
    setVariables((prevVariables) => ({
      ...prevVariables,
      [name]: value,
    }));
    setShowForm(false); // Masquer le formulaire après l'ajout
  };

  // Fonction pour mettre à jour la valeur d'une variable
  const handleVariableChange = (key: string, newValue: number) => {
    setVariables((prevVariables) => ({
      ...prevVariables,
      [key]: newValue,
    }));
  };

  return (
    <div className={`drawer ${isOpen ? 'open' : ''}`} id={id}>
      <div className="drawer-content">
        <div className="drawer-header">
          <div className="icon-header">
            <div className="close-icon" onClick={onClose}>
              <CloseIcon label="close drawer" />
            </div>
            <div className="angle-brackets-icon">
              <AngleBracketsIcon label="angle brackets" />
            </div>
          </div>
          {titre && <h2 className="drawer-titre">{titre}</h2>}
        </div>
        <div className="drawer-body">
          {}
          {Object.entries(variables).map(([key, value]) => (
            <VariablesInput
              key={key}
              id={key}
              label={key}
              values={{ [key]: value }}
              onChange={(newValue) => handleVariableChange(key, newValue)}
            />
          ))}
          {}
          <AddVariablesWidget onClick={handleAddVariableClick} />
          {}
          {showForm && <VariableForm onAddVariable={handleAddVariable} />}
        </div>
      </div>
    </div>
  );
};

export default Drawer;