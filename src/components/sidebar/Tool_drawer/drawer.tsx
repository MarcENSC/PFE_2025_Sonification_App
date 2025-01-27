import React from 'react';
import '../../../styles/Drawer.css'; // Importez le fichier CSS global
import { VariablesInput } from './variablesInput';
import CloseIcon from '@atlaskit/icon/core/close';
import AngleBracketsIcon from '@atlaskit/icon/core/angle-brackets';

// Définir les props du composant Drawer
interface DrawerProps {
  isOpen: boolean; // Indique si le drawer est ouvert
  onClose: () => void; // Fonction pour fermer le drawer
  
  titre?: string; // Titre optionnel du drawer
  id?: string; // ID optionnel du drawer
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, titre, id }) => {
  return (
    <div className={`drawer ${isOpen ? 'open' : ''}`} id={id}> {/* Ajout de l'ID */}
      <div className="drawer-content">
        <div className="drawer-header">
            <div className='icon-header'>
                <div className='close-icon'> 
                <CloseIcon label='close drawer' />
                </div>
                <div className='angle-brackets-icon'> 
                <AngleBracketsIcon label='angle brackets' />
                </div>
            
            



            </div>
        {titre && <h2 className="drawer-titre">{titre}</h2>} {/* Affichage conditionnel du titre */}
        </div> 
       

        <VariablesInput id='1' label='frequency' values={{ frequency: 1 }} />
      </div>
    </div>
  );
};

export default Drawer;